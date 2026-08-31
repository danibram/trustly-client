// Runtime smoke test for the built package, meant to run on the oldest
// supported Node.js versions where the dev toolchain (vitest) cannot.
// Requires the committed build/ output and does a full signed round trip.
const assert = require('assert')
const { createServer } = require('http')
const { readFileSync } = require('fs')
const { join } = require('path')

const lib = require('../build/main/index.js')
const client = lib.default
const { sign, serialize } = lib.helpers

const KEYS = join(__dirname, '..', 'build', 'keys', 'test')
const priv = readFileSync(join(KEYS, 'merchant_private_key.pem'), 'utf8')
const pub = join(KEYS, 'merchant_public_key.pem')

assert.strictEqual(typeof client, 'function', 'default export is the factory')
assert.strictEqual(serialize('Deposit', 'u', { a: '1' }), 'Depositua1')

const server = createServer((req, res) => {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
        const body = JSON.parse(raw)
        const data = { orderid: 'smoke-1', url: 'https://pay.example' }
        const result = {
            signature: sign(
                serialize(body.method, body.params.UUID, data),
                priv
            ),
            uuid: body.params.UUID,
            method: body.method,
            data,
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ result, version: '1.1' }))
    })
})

server.listen(0, '127.0.0.1', async () => {
    const endpoint = 'http://127.0.0.1:' + server.address().port
    const tClient = client({
        username: 'u',
        password: 'p',
        privateKey: priv,
        publicKeyPath: pub,
    })
    // v3 ignores the endpoint config option, so point it at the test server directly
    tClient.endpoint = endpoint
    try {
        const res = await tClient.deposit(
            {
                NotificationURL: 'http://x/n',
                EndUserID: 'e',
                MessageID: 'm',
            },
            { Currency: 'EUR' }
        )
        assert.deepStrictEqual(res, {
            orderid: 'smoke-1',
            url: 'https://pay.example',
        })
        console.log('smoke OK on Node ' + process.version)
        server.close()
    } catch (err) {
        console.error('smoke FAILED', err)
        process.exit(1)
    }
})
