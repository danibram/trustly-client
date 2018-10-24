import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'

// Path helpers
export const readFile = (path: string): Promise<string> =>
    new Promise((resolve, reject) =>
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) return reject(err)

            resolve(data)
        })
    )

let ROOT = path.resolve(__dirname, '..', '..')

export const root = (...args): string => path.join(ROOT, ...args)

// Encrypt / Decrypt
export const sign = function(data, key) {
    let signer = crypto.createSign('RSA-SHA1')
    signer.update(data, 'utf8')
    return signer.sign(key, 'base64')
}

export const verify = function(data, signature, key) {
    let verifier = crypto.createVerify('RSA-SHA1')
    verifier.update(data, 'utf8')

    return verifier.verify(key, signature, 'base64')
}

export const parseError = (err, lastRequest, lastResponse) => {
    let error = {
        lastRequest: lastRequest,
        lastResponse: lastResponse,
        trustlyError: null,
        clientError: null
    }

    if (err && err.error) {
        let tError = {
            method: err.error.error.method ? err.error.error.method : null,
            uuid: err.error.error.uuid ? err.error.error.uuid : null,
            message: err.error.message ? err.error.message : null,
            code: err.error.code ? err.error.code : null
        }

        error.trustlyError = tError as any
    } else {
        error.clientError = err
    }

    throw error
}
