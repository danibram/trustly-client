import { test } from 'ava'
import * as path from 'path'
import * as fs from 'fs'

import { Client } from '../lib/Client'

test('Should init correctly', async t => {
    let client = new Client({
        username: 'merchant_username',
        password: 'merchant_password',
        privateKeyPath: path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem')
    })

    t.notThrows(() => client.init())
})

test('Should have methods', async t => {
    let client = new Client({
        username: 'merchant_username',
        password: 'merchant_password',
        privateKeyPath: path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem')
    })

    t.true(typeof client._createMethod === 'function')
    t.true(typeof client._makeRequest === 'function')
    t.true(typeof client._prepareRequest === 'function')

    t.true(typeof client.createNotificationResponse === 'function')
    t.true(typeof client.prepareNotificationResponse === 'function')
    t.true(typeof client.verifyResponse === 'function')
    t.true(typeof client.init === 'function')

    t.true(typeof client.withdraw === 'function')
    t.true(typeof client.deposit === 'function')
    t.true(typeof client.charge === 'function')
    t.true(typeof client.approveWithdrawal === 'function')
    t.true(typeof client.denyWithdrawal === 'function')
    t.true(typeof client.selectAccount === 'function')
})
