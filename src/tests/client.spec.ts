import { test } from 'ava'
import * as path from 'path'
import { Client } from '../lib/Client'

test('Should init correctly', async t => {
    t.notThrows(() =>
        new Client({
            username: 'merchant_username',
            password: 'merchant_password',
            privateKeyPath: path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem')
        })
    )
})
