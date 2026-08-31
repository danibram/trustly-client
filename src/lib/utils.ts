import * as crypto from 'crypto'
import * as fs from 'fs'

export const readFile = (path: string): Promise<string> =>
    new Promise((resolve, reject) =>
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) return reject(err)

            resolve(data)
        })
    )

export const sign = function (data, key) {
    let signer = crypto.createSign('RSA-SHA1')
    signer.update(data, 'utf8')
    return signer.sign(key, 'base64')
}

export const verify = function (data, signature, key) {
    let verifier = crypto.createVerify('RSA-SHA1')
    verifier.update(data, 'utf8')

    return verifier.verify(key, signature, 'base64')
}

// the error envelope is meant to be logged, so it must not carry credentials
const redactCredentials = (req) => {
    if (!req || !req.params || !req.params.Data) {
        return req
    }
    const Data = { ...req.params.Data }
    if (Data.Password !== undefined) {
        Data.Password = '[redacted]'
    }
    return { ...req, params: { ...req.params, Data } }
}

export const parseError = (err, lastRequest, lastResponse) => {
    let error = {
        lastRequest: redactCredentials(lastRequest),
        lastResponse: lastResponse,
        trustlyError: null,
        clientError: null,
    }

    if (err && err.error) {
        const details = err.error.error || {}
        let tError = {
            method: details.method ? details.method : null,
            uuid: details.uuid ? details.uuid : null,
            message: err.error.message ? err.error.message : null,
            code: err.error.code ? err.error.code : null,
        }

        error.trustlyError = tError as any
    } else {
        error.clientError = err
    }

    throw error
}
