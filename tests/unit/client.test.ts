import { readFileSync } from 'fs'
import { createServer, Server } from 'http'
import { AddressInfo } from 'net'
import { join } from 'path'
import { afterEach, describe, expect, it } from 'vitest'
import { Client } from '../../src/lib/Client'
import { serialize } from '../../src/lib/trustlySerializeData'
import { sign, verify } from '../../src/lib/utils'

const KEYS = join(__dirname, '..', 'keys')
const MERCHANT_PUBLIC = join(KEYS, 'merchant_public_key.pem')
const MERCHANT_PRIVATE = join(KEYS, 'merchant_private_key.pem')
const privateKeyPem = readFileSync(MERCHANT_PRIVATE, 'utf8')

// The test merchant keypair doubles as the "trustly" keypair so the client
// can verify responses we sign ourselves.
const baseConfig = {
    username: 'merchant_username',
    password: 'merchant_password',
    privateKeyPath: MERCHANT_PRIVATE,
    publicKeyPath: MERCHANT_PUBLIC,
}

const UUID_V4 =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('constructor', () => {
    it('throws without username', () => {
        expect(
            () => new Client({ ...baseConfig, username: '' } as any)
        ).toThrow(/username/i)
    })

    it('throws without password', () => {
        expect(
            () => new Client({ ...baseConfig, password: '' } as any)
        ).toThrow(/password/i)
    })

    it('throws without a private key', () => {
        expect(
            () =>
                new Client({
                    username: 'u',
                    password: 'p',
                } as any)
        ).toThrow(/privateKey/i)
    })

    it('defaults to the test endpoint', () => {
        const client = new Client(baseConfig)
        expect(client.endpoint).toBe('https://test.trustly.com/api/1')
        expect(client.environment).toBe('development')
    })

    it('uses the production endpoint for prod-like environments', () => {
        for (const environment of ['production', 'prod', 'p']) {
            const client = new Client({
                ...baseConfig,
                environment,
                publicKeyPath: MERCHANT_PUBLIC,
            })
            expect(client.endpoint).toBe('https://trustly.com/api/1')
            expect(client.environment).toBe('production')
        }
    })

    it('honors a custom endpoint from the config', () => {
        const client = new Client({
            ...baseConfig,
            endpoint: 'http://127.0.0.1:9999/api/1',
        })
        expect(client.endpoint).toBe('http://127.0.0.1:9999/api/1')
    })

    it('defaults to the embedded trustly public keys per environment', async () => {
        const { TRUSTLY_PROD_PUBLIC_KEY, TRUSTLY_TEST_PUBLIC_KEY } =
            await import('../../src/keys')
        const { publicKeyPath, ...noPublicKey } = baseConfig

        const dev = new Client(noPublicKey)
        expect(dev.publicKey).toBe(TRUSTLY_TEST_PUBLIC_KEY)

        const prod = new Client({ ...noPublicKey, environment: 'production' })
        expect(prod.publicKey).toBe(TRUSTLY_PROD_PUBLIC_KEY)
    })

    it('accepts an inline public key', async () => {
        const publicKey = readFileSync(MERCHANT_PUBLIC, 'utf8')
        const { publicKeyPath, ...noPublicKey } = baseConfig
        const client = new Client({ ...noPublicKey, publicKey })
        await client.ready
        expect(client.publicKey).toBe(publicKey)
    })

    it('surfaces a bad key path on first use instead of crashing at construction', async () => {
        const client = new Client({
            ...baseConfig,
            privateKeyPath: '/nonexistent/key.pem',
        })
        // an unhandled rejection here would fail the vitest run
        await new Promise((resolve) => setTimeout(resolve, 20))
        await expect(client.balance({})).rejects.toMatch(
            /Error reading privateKey/
        )
    })

    it('accepts an inline private key instead of a path', async () => {
        const { readFile } = await import('../../src/lib/utils')
        const privateKey = await readFile(MERCHANT_PRIVATE)
        const client = new Client({
            username: 'u',
            password: 'p',
            privateKey,
            publicKeyPath: MERCHANT_PUBLIC,
        })
        await client.ready
        expect(client.privateKey).toBe(privateKey)
    })
})

describe('_prepareRequest', () => {
    it('builds a signed JSON-RPC request', async () => {
        const client = new Client(baseConfig)
        await client.ready

        const req = client._prepareRequest(
            'Deposit',
            { EndUserID: '123' },
            { Currency: 'EUR' }
        )

        expect(req.method).toBe('Deposit')
        expect(req.version).toBe('1.1')

        const params = req.params as any
        expect(params.UUID).toMatch(UUID_V4)
        expect(params.Data.Username).toBe('merchant_username')
        expect(params.Data.Password).toBe('merchant_password')
        expect(params.Data.EndUserID).toBe('123')
        expect(params.Data.Attributes).toEqual({ Currency: 'EUR' })

        const serialized = serialize('Deposit', params.UUID, params.Data)
        expect(verify(serialized, params.Signature, client.publicKey)).toBe(
            true
        )
    })

    it('generates a fresh UUID per request', async () => {
        const client = new Client(baseConfig)
        await client.ready
        const a = client._prepareRequest('Deposit', {}) as any
        const b = client._prepareRequest('Deposit', {}) as any
        expect(a.params.UUID).not.toBe(b.params.UUID)
    })

    it('sets Attributes to null when omitted', async () => {
        const client = new Client(baseConfig)
        await client.ready
        const req = client._prepareRequest('Balance', {}) as any
        expect(req.params.Data.Attributes).toBeNull()
    })
})

describe('notifications', () => {
    const makeNotification = (privateKey: string, data: any = {}) => {
        const uuid = '258a2184-2842-b485-25ca-293525152425'
        const method = 'credit'
        const notification = {
            method,
            params: {
                signature: sign(serialize(method, uuid, data), privateKey),
                uuid,
                data,
            },
            version: '1.1',
        }
        return notification
    }

    it('verifies and parses a valid notification (object and string)', async () => {
        const client = new Client(baseConfig)
        await client.ready
        const notification = makeNotification(client.privateKey!, {
            amount: '902.50',
            currency: 'EUR',
        })

        await expect(
            client.verifyAndParseNotification(notification)
        ).resolves.toEqual(notification)
        await expect(
            client.verifyAndParseNotification(JSON.stringify(notification))
        ).resolves.toEqual(notification)
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
        ).rejects.toMatchObject({
            error: expect.objectContaining({
                message: expect.stringMatching(/verify/i),
            }),
        })
    })

    it('rejects unparseable notification strings', async () => {
        const client = new Client(baseConfig)
        await client.ready
        await expect(
            client.verifyAndParseNotification('not json{')
        ).rejects.toMatchObject({
            error: expect.objectContaining({
                message: expect.stringMatching(/JSON/i),
            }),
        })
    })

    it('creates a signed OK notification response', async () => {
        const client = new Client(baseConfig)
        await client.ready
        const notification = makeNotification(client.privateKey!, {
            amount: '1.00',
        })

        const res = await client.createNotificationResponse(notification)
        expect(res.result.uuid).toBe(notification.params.uuid)
        expect(res.result.method).toBe('credit')
        expect(res.result.data).toEqual({ status: 'OK' })

        const serialized = serialize(
            res.result.method,
            res.result.uuid,
            res.result.data
        )
        expect(verify(serialized, res.result.signature, client.publicKey)).toBe(
            true
        )
    })

    it('creates a FAILED notification response on demand', async () => {
        const client = new Client(baseConfig)
        await client.ready
        const notification = makeNotification(client.privateKey!, {})
        const res = await client.createNotificationResponse(
            notification,
            'FAILED'
        )
        expect(res.result.data).toEqual({ status: 'FAILED' })
    })
})

describe('_makeRequest over HTTP', () => {
    let server: Server | undefined

    afterEach(() => {
        server?.close()
        server = undefined
    })

    const startServer = (
        handler: (body: any) => {
            status?: number
            payload?: any
            rawBody?: string
        }
    ): Promise<string> =>
        new Promise((resolve) => {
            server = createServer((req, res) => {
                let raw = ''
                req.on('data', (chunk) => (raw += chunk))
                req.on('end', () => {
                    const {
                        status = 200,
                        payload,
                        rawBody,
                    } = handler(JSON.parse(raw))
                    res.writeHead(status, {
                        'Content-Type': 'application/json',
                    })
                    res.end(rawBody ?? JSON.stringify(payload))
                })
            })
            server.listen(0, '127.0.0.1', () => {
                const { port } = server!.address() as AddressInfo
                resolve(`http://127.0.0.1:${port}`)
            })
        })

    const signedResult = (body: any, data: any) => ({
        signature: sign(
            serialize(body.method, body.params.UUID, data),
            privateKeyPem
        ),
        uuid: body.params.UUID,
        method: body.method,
        data,
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
            const result = {
                signature: '',
                uuid: body.params.UUID,
                method: body.method,
                data,
            }
            result.signature = sign(
                serialize(result.method, result.uuid, result.data),
                privateKeyPem
            )
            return { payload: { result, version: '1.1' } }
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
        expect(client._lastResponse.result.data).toEqual(response)
    })

    it('rejects when the response signature does not verify', async () => {
        const endpoint = await startServer((body) => ({
            payload: {
                result: {
                    signature: 'bm90IGEgcmVhbCBzaWduYXR1cmU=',
                    uuid: body.params.UUID,
                    method: body.method,
                    data: { orderid: '1' },
                },
                version: '1.1',
            },
        }))

        const client = await makeClient(endpoint)
        await expect(
            client.deposit(
                {
                    NotificationURL: 'http://localhost/notify',
                    EndUserID: 'user@example.com',
                    MessageID: 'msg-2',
                },
                { Currency: 'EUR' }
            )
        ).rejects.toMatchObject({
            trustlyError: null,
            clientError: expect.objectContaining({
                message: expect.stringMatching(/verify/i),
            }),
        })
    })

    it('rejects a signed response whose uuid does not match the request', async () => {
        const endpoint = await startServer((body) => {
            const data = { orderid: 'replayed' }
            const foreignUuid = 'ffffffff-ffff-4fff-8fff-ffffffffffff'
            return {
                payload: {
                    result: {
                        signature: sign(
                            serialize(body.method, foreignUuid, data),
                            privateKeyPem
                        ),
                        uuid: foreignUuid,
                        method: body.method,
                        data,
                    },
                    version: '1.1',
                },
            }
        })

        const client = await makeClient(endpoint)
        await expect(client.balance({})).rejects.toMatchObject({
            clientError: expect.objectContaining({
                message: expect.stringMatching(/does not match the request/),
            }),
        })
    })

    it('rejects non-2xx responses even when the body is a validly signed result', async () => {
        const endpoint = await startServer((body) => ({
            status: 500,
            payload: {
                result: signedResult(body, { orderid: 'from-a-500' }),
                version: '1.1',
            },
        }))

        const client = await makeClient(endpoint)
        try {
            await client.balance({})
            expect.unreachable('a 500 must reject')
        } catch (err: any) {
            expect(err.clientError.message).toBe(
                'Request failed with status code 500'
            )
            expect(err.clientError.status).toBe(500)
            expect(err.lastResponse.result.data).toEqual({
                orderid: 'from-a-500',
            })
        }
    })

    it('keeps the raw body in lastResponse when it is not JSON', async () => {
        const endpoint = await startServer(() => ({
            status: 200,
            rawBody: '<html>gateway blew up</html>',
        }))

        const client = await makeClient(endpoint)
        try {
            await client.balance({})
            expect.unreachable('a non-JSON body must reject')
        } catch (err: any) {
            expect(err.clientError.message).toContain('Cant parse the response')
            expect(err.lastResponse).toBe('<html>gateway blew up</html>')
            expect(client._lastResponse).toBe('<html>gateway blew up</html>')
        }
    })

    it('rejects with the trustly error payload on JSON-RPC errors', async () => {
        const trustlyErrorBody = {
            version: '1.1',
            error: {
                name: 'JSONRPCError',
                code: 616,
                message: 'ERROR_UNABLE_TO_VERIFY_RSA_SIGNATURE',
                error: {
                    method: 'Deposit',
                    uuid: 'uuid-err',
                    data: {
                        code: 616,
                        message: 'ERROR_UNABLE_TO_VERIFY_RSA_SIGNATURE',
                    },
                },
            },
        }
        const endpoint = await startServer(() => ({
            payload: trustlyErrorBody,
        }))

        const client = await makeClient(endpoint)
        try {
            await client.deposit(
                {
                    NotificationURL: 'http://localhost/notify',
                    EndUserID: 'user@example.com',
                    MessageID: 'msg-3',
                },
                { Currency: 'EUR' }
            )
            expect.unreachable('deposit must reject on trustly error')
        } catch (err: any) {
            expect(err.trustlyError).toEqual({
                method: 'Deposit',
                uuid: 'uuid-err',
                message: 'ERROR_UNABLE_TO_VERIFY_RSA_SIGNATURE',
                code: 616,
            })
            expect(err.clientError).toBeNull()
            expect(err.lastResponse).toEqual(trustlyErrorBody)
        }
    })

    it('redacts the password in the error envelope', async () => {
        const endpoint = await startServer(() => ({
            status: 500,
            payload: { boom: true },
        }))

        const client = await makeClient(endpoint)
        try {
            await client.balance({})
            expect.unreachable('a 500 must reject')
        } catch (err: any) {
            expect(err.lastRequest.params.Data.Password).toBe('[redacted]')
            expect(JSON.stringify(err)).not.toContain('merchant_password')
        }
        // the redaction copies; the live request object is untouched
        expect(client._lastRequest.params.Data.Password).toBe(
            'merchant_password'
        )
    })

    it('rejects when the endpoint is unreachable', async () => {
        const client = await makeClient('http://127.0.0.1:1')
        try {
            await client.balance({})
            expect.unreachable('an unreachable endpoint must reject')
        } catch (err: any) {
            expect(err.trustlyError).toBeNull()
            expect(err.clientError).toBeInstanceOf(Error)
        }
    })

    it('rejects with the error envelope when no fetch implementation exists', async () => {
        const client = new Client(baseConfig)
        await client.ready

        const originalFetch = globalThis.fetch
        // @ts-expect-error simulate a runtime without global fetch
        delete globalThis.fetch
        try {
            await client.balance({})
            expect.unreachable('must reject without a fetch')
        } catch (err: any) {
            expect(err.clientError.message).toMatch(/No fetch implementation/)
        } finally {
            globalThis.fetch = originalFetch
        }
    })

    it('rejects with a timeout error when the server is too slow', async () => {
        const endpoint = await new Promise<string>((resolve) => {
            server = createServer((_req, res) => {
                // never respond within the timeout window
                setTimeout(() => res.end('{}'), 5000).unref()
            })
            server.listen(0, '127.0.0.1', () => {
                const { port } = server!.address() as AddressInfo
                resolve(`http://127.0.0.1:${port}`)
            })
        })

        const client = new Client({ ...baseConfig, timeout: 100 })
        await client.ready
        client.endpoint = endpoint

        const start = Date.now()
        await expect(client.balance({})).rejects.toBeTruthy()
        expect(Date.now() - start).toBeLessThan(3000)
    })

    it('merges fetchOptions.headers with the defaults instead of replacing them', async () => {
        let seenCustom: string | undefined
        let seenContentType: string | undefined
        const endpoint = await startServer((body) => ({
            payload: {
                result: signedResult(body, { ok: '1' }),
                version: '1.1',
            },
        }))

        server!.prependListener('request', (req) => {
            seenCustom = req.headers['x-custom'] as string
            seenContentType = req.headers['content-type'] as string
        })

        const client = new Client({
            ...baseConfig,
            fetchOptions: { headers: { 'X-Custom': 'injected' } },
        })
        await client.ready
        client.endpoint = endpoint

        await client.balance({})
        expect(seenCustom).toBe('injected')
        expect(seenContentType).toContain('application/json')
    })

    it('keeps the timeout active when the user passes their own signal', async () => {
        const endpoint = await new Promise<string>((resolve) => {
            server = createServer((_req, res) => {
                setTimeout(() => res.end('{}'), 5000).unref()
            })
            server.listen(0, '127.0.0.1', () => {
                const { port } = server!.address() as AddressInfo
                resolve(`http://127.0.0.1:${port}`)
            })
        })

        const userController = new AbortController()
        const client = new Client({
            ...baseConfig,
            timeout: 100,
            fetchOptions: { signal: userController.signal },
        })
        await client.ready
        client.endpoint = endpoint

        const start = Date.now()
        await expect(client.balance({})).rejects.toBeTruthy()
        expect(Date.now() - start).toBeLessThan(3000)
    })

    it('disables the timeout when timeout is 0', async () => {
        const endpoint = await new Promise<string>((resolve) => {
            server = createServer((req, res) => {
                let raw = ''
                req.on('data', (c) => (raw += c))
                req.on('end', () => {
                    const body = JSON.parse(raw)
                    setTimeout(() => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        })
                        res.end(
                            JSON.stringify({
                                result: signedResult(body, { slow: '1' }),
                                version: '1.1',
                            })
                        )
                    }, 300)
                })
            })
            server.listen(0, '127.0.0.1', () => {
                const { port } = server!.address() as AddressInfo
                resolve(`http://127.0.0.1:${port}`)
            })
        })

        const client = new Client({ ...baseConfig, timeout: 0 })
        await client.ready
        client.endpoint = endpoint

        expect(client.timeout).toBe(0)
        await expect(client.balance({})).resolves.toEqual({ slow: '1' })
    })
})

describe('custom fetch injection', () => {
    it('uses the injected fetch implementation instead of the global one', async () => {
        const calls: Array<{ url: string; init: any }> = []

        const fakeFetch = async (url: string, init?: any) => {
            calls.push({ url, init })
            const body = JSON.parse(init.body)
            const data = { orderid: 'injected-1' }
            const result = {
                signature: sign(
                    serialize(body.method, body.params.UUID, data),
                    privateKeyPem
                ),
                uuid: body.params.UUID,
                method: body.method,
                data,
            }
            return {
                ok: true,
                status: 200,
                text: async () => JSON.stringify({ result, version: '1.1' }),
            }
        }

        const client = new Client({ ...baseConfig, fetch: fakeFetch })
        await client.ready

        const response = await client.deposit(
            {
                NotificationURL: 'http://localhost/notify',
                EndUserID: 'user@example.com',
                MessageID: 'msg-injected',
            },
            { Currency: 'EUR' }
        )

        expect(response).toEqual({ orderid: 'injected-1' })
        expect(calls).toHaveLength(1)
        expect(calls[0].url).toBe('https://test.trustly.com/api/1')
        expect(calls[0].init.method).toBe('POST')
        expect(calls[0].init.headers['Content-Type']).toContain(
            'application/json'
        )
    })

    it('propagates errors from the injected fetch as clientError', async () => {
        const failingFetch = async () => {
            throw new Error('proxy exploded')
        }
        const client = new Client({ ...baseConfig, fetch: failingFetch })
        await client.ready

        try {
            await client.balance({})
            expect.unreachable('balance must reject')
        } catch (err: any) {
            expect(err.clientError).toBeInstanceOf(Error)
            expect(err.clientError.message).toBe('proxy exploded')
        }
    })
})
