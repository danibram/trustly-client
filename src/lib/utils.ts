import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

// Path helpers
export const readFile = (path: string): Promise<string> =>
    new Promise ((resolve, reject) =>
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) return reject(err)

            resolve(data)
        })
    )

let ROOT = path.resolve(__dirname, '..', '..')

export const root = (...args): string =>
    path.join(ROOT, ...args)

// Encrypt / Decrypt
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
