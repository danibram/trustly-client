import { readFileSync } from 'fs'
import { createServer, Server } from 'http'
import { AddressInfo } from 'net'
import { join } from 'path'
import { afterEach, describe, expect, it } from 'vitest'
import { Client } from '../../src/lib/Client'
import { serialize } from '../../src/lib/trustlySerializeData'
import { sign, verify } from '../../src/lib/utils'

const KEYS = join(__dirname, '..', '..', 'build', 'keys', 'test')
const MERCHANT_PUBLIC = join(KEYS, 'merchant_public_key.pem')
const MERCHANT_PRIVATE = join(KEYS, 'merchant_private_key.pem')
const privateKeyPem = readFileSync(MERCHANT_PRIVATE, 'utf8')

// The merchant keypair doubles as the "trustly" keypair so the client can
// verify responses we sign ourselves.
const baseConfig = {
    username: 'merchant_username',
    password: 'merchant_password',
    privateKeyPath: MERCHANT_PRIVATE,
    publicKeyPath: MERCHANT_PUBLIC,
}

const UUID_V4 =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('constructor', () => {
    it('throws without username / password / key', () => {
        expect(() => new Client({ ...baseConfig, username: '' } as any)).toThrow(
            /username/i
        )
        expect(() => new Client({ ...baseConfig, password: '' } as any)).toThrow(
            /password/i
        )
        expect(() => new Client({ username: 'u', password: 'p' } as any)).toThrow(
            /privateKey/i
        )
    })

    it('selects endpoint by environment', () => {
        expect(new Client(baseConfig).endpoint).toBe(
            'https://test.trustly.com/api/1'
        )
        expect(
            new Client({ ...baseConfig, environment: 'production' }).endpoint
        ).toBe('https://trustly.com/api/1')
    })
})

describe('_prepareRequest', () => {
    it('builds a signed request with a v4 uuid (proves the uuid dep bump)', async () => {
        const client = new Client(baseConfig)
        await client.ready

        const req: any = client._prepareRequest(
            'Deposit',
            { EndUserID: '123' },
            { Currency: 'EUR' }
        )

        expect(req.params.UUID).toMatch(UUID_V4)
        expect(req.params.Data.Username).toBe('merchant_username')
        expect(req.params.Data.Attributes).toEqual({ Currency: 'EUR' })
        expect(
            verify(
                serialize('Deposit', req.params.UUID, req.params.Data),
                req.params.Signature,
                client.publicKey
            )
        ).toBe(true)
    })

    it('generates a fresh uuid per request', async () => {
        const client = new Client(baseConfig)
        await client.ready
        const a: any = client._prepareRequest('Deposit', {})
        const b: any = client._prepareRequest('Deposit', {})
        expect(a.params.UUID).not.toBe(b.params.UUID)
    })
})

describe('notifications', () => {
    const makeNotification = (privateKey: string, data: any = {}) => {
        const uuid = '258a2184-2842-b485-25ca-293525152425'
        const method = 'credit'
        return {
            method,
            params: {
                signature: sign(serialize(method, uuid, data), privateKey),
                uuid,
                data,
            },
            version: '1.1',
        }
    }

    it('verifies and composes a signed OK response', async () => {
        const client = new Client(baseConfig)
        await client.ready
        const notification = makeNotification(client.privateKey!, {
            amount: '1.00',
        })

        const res: any = await client.createNotificationResponse(notification)
        expect(res.result.uuid).toBe(notification.params.uuid)
        expect(res.result.data).toEqual({ status: 'OK' })
        expect(
            verify(
                serialize(res.result.method, res.result.uuid, res.result.data),
                res.result.signature,
                client.publicKey
            )
        ).toBe(true)
    })

    it('rejects a notification with a bad signature', async () => {
        const client = new Client(baseConfig)
        await client.ready
        const notification = makeNotification(client.privateKey!, {
            amount: '1.00',
        })
        notification.params.data.amount = '999.00'
        await expect(
            client.verifyAndParseNotification(notification)
        ).rejects.toBeTruthy()
    })
})

describe('_makeRequest over HTTP (axios)', () => {
    let server: Server | undefined
    afterEach(() => {
        server?.close()
        server = undefined
    })

    const startServer = (
        handler: (body: any) => { status?: number; payload: any }
    ): Promise<string> =>
        new Promise((resolve) => {
            server = createServer((req, res) => {
                let raw = ''
                req.on('data', (c) => (raw += c))
                req.on('end', () => {
                    const { status = 200, payload } = handler(JSON.parse(raw))
                    res.writeHead(status, {
                        'Content-Type': 'application/json',
                    })
                    res.end(JSON.stringify(payload))
                })
            })
            server.listen(0, '127.0.0.1', () => {
                const { port } = server!.address() as AddressInfo
                resolve(`http://127.0.0.1:${port}`)
            })
        })

    const makeClient = async (endpoint: string) => {
        const client = new Client(baseConfig)
        await client.ready
        client.endpoint = endpoint
        return client
    }

    it('resolves with result data when the signed response verifies', async () => {
        const endpoint = await startServer((body) => {
            const data = { orderid: '3473202294', url: 'https://pay.me' }
            return {
                payload: {
                    result: {
                        signature: sign(
                            serialize(body.method, body.params.UUID, data),
                            privateKeyPem
                        ),
                        uuid: body.params.UUID,
                        method: body.method,
                        data,
                    },
                    version: '1.1',
                },
            }
        })

        const client = await makeClient(endpoint)
        const response = await client.deposit(
            {
                NotificationURL: 'http://localhost/notify',
                EndUserID: 'user@example.com',
                MessageID: 'msg-1',
            },
            { Currency: 'EUR', Amount: '1.00' }
        )
        expect(response).toEqual({
            orderid: '3473202294',
            url: 'https://pay.me',
        })
    })

    it('rejects with the trustly error payload on JSON-RPC errors', async () => {
        const endpoint = await startServer(() => ({
            payload: {
                version: '1.1',
                error: {
                    name: 'JSONRPCError',
                    code: 616,
                    message: 'ERROR_UNABLE_TO_VERIFY_RSA_SIGNATURE',
                    error: { method: 'Deposit', uuid: 'uuid-err' },
                },
            },
        }))

        const client = await makeClient(endpoint)
        try {
            await client.balance({})
            expect.unreachable('must reject on trustly error')
        } catch (err: any) {
            expect(JSON.stringify(err)).toContain(
                'ERROR_UNABLE_TO_VERIFY_RSA_SIGNATURE'
            )
        }
    })

    it('rejects when the endpoint is unreachable', async () => {
        const client = await makeClient('http://127.0.0.1:1')
        await expect(client.balance({})).rejects.toBeTruthy()
    })
})
