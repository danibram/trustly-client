import { generateKeyPairSync } from 'crypto'
import { describe, expect, it } from 'vitest'
import { parseError, readFile, sign, verify } from '../../src/lib/utils'

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
})

describe('sign / verify', () => {
    it('verifies a signature it produced', () => {
        const data = 'Deposituuid-1a1b2'
        expect(verify(data, sign(data, privateKey), publicKey)).toBe(true)
    })

    it('rejects a signature over different data', () => {
        expect(verify('other', sign('some', privateKey), publicKey)).toBe(false)
    })
})

describe('readFile', () => {
    it('reads an existing file', async () => {
        expect(await readFile(__filename)).toContain('readFile')
    })

    it('rejects for a missing file', async () => {
        await expect(readFile('/nonexistent/nope.pem')).rejects.toBeTruthy()
    })
})

describe('parseError', () => {
    it('wraps a trustly JSON-RPC error and throws', () => {
        try {
            parseError(
                {
                    error: {
                        error: { method: 'Deposit', uuid: 'uuid-1' },
                        message: 'ERROR_DUPLICATE_MESSAGE_ID',
                        code: 615,
                    },
                },
                { req: 1 },
                { res: 1 }
            )
            expect.unreachable('parseError must throw')
        } catch (err: any) {
            expect(err.trustlyError).toEqual({
                method: 'Deposit',
                uuid: 'uuid-1',
                message: 'ERROR_DUPLICATE_MESSAGE_ID',
                code: 615,
            })
            expect(err.clientError).toBeNull()
        }
    })

    it('wraps a non-trustly error as clientError and throws', () => {
        const boom = new Error('network down')
        try {
            parseError(boom, null, null)
            expect.unreachable('parseError must throw')
        } catch (err: any) {
            expect(err.clientError).toBe(boom)
            expect(err.trustlyError).toBeNull()
        }
    })
})
