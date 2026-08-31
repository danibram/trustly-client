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
        const signature = sign(data, privateKey)
        expect(verify(data, signature, publicKey)).toBe(true)
    })

    it('rejects a signature over different data', () => {
        const signature = sign('some data', privateKey)
        expect(verify('other data', signature, publicKey)).toBe(false)
    })

    it('rejects a tampered signature', () => {
        const signature = sign('some data', privateKey)
        const tampered = Buffer.from(signature, 'base64')
        tampered[0] = tampered[0] ^ 0xff
        expect(
            verify('some data', tampered.toString('base64'), publicKey)
        ).toBe(false)
    })
})

describe('readFile', () => {
    it('reads an existing file', async () => {
        const content = await readFile(__filename)
        expect(content).toContain('readFile')
    })

    it('rejects for a missing file', async () => {
        await expect(readFile('/nonexistent/nope.pem')).rejects.toBeTruthy()
    })
})

describe('parseError', () => {
    it('wraps a trustly JSON-RPC error and throws', () => {
        const trustlyError = {
            error: {
                error: { method: 'Deposit', uuid: 'uuid-1' },
                message: 'ERROR_DUPLICATE_MESSAGE_ID',
                code: 615,
            },
        }
        try {
            parseError(trustlyError, { req: 1 }, { res: 1 })
            expect.unreachable('parseError must throw')
        } catch (err: any) {
            expect(err.trustlyError).toEqual({
                method: 'Deposit',
                uuid: 'uuid-1',
                message: 'ERROR_DUPLICATE_MESSAGE_ID',
                code: 615,
            })
            expect(err.clientError).toBeNull()
            expect(err.lastRequest).toEqual({ req: 1 })
            expect(err.lastResponse).toEqual({ res: 1 })
        }
    })

    it('keeps message and code when the trustly error has no nested details', () => {
        try {
            parseError(
                { error: { code: 637, message: 'ERROR_MALFORMED_JSON' } },
                null,
                null
            )
            expect.unreachable('parseError must throw')
        } catch (err: any) {
            expect(err.trustlyError).toEqual({
                method: null,
                uuid: null,
                message: 'ERROR_MALFORMED_JSON',
                code: 637,
            })
        }
    })

    it('redacts the password inside lastRequest', () => {
        const lastRequest = {
            method: 'Deposit',
            params: {
                UUID: 'u-1',
                Data: { Username: 'u', Password: 'secret', EndUserID: 'e' },
            },
        }
        try {
            parseError(new Error('boom'), lastRequest, null)
            expect.unreachable('parseError must throw')
        } catch (err: any) {
            expect(err.lastRequest.params.Data.Password).toBe('[redacted]')
            expect(err.lastRequest.params.Data.Username).toBe('u')
        }
        expect(lastRequest.params.Data.Password).toBe('secret')
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
