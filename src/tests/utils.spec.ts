import { sign, verify } from '../lib/utils'
import { serialize } from '../lib/trustlySerializeData'

import { test } from 'ava'
import * as path from 'path'
import * as fs from 'fs'

test('Should sign correctly', async t => {
    let serializedData = 'AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username'
    let signatureResult = 'UXh7ZdkrG4cLo0lyhF3nm+UPo/ZCM+JuUmZq6Zr4W7oygQVeWEK/Hi2Y0sjH8/aE7g39beGtFPw0IugWhETwaT/zj7GIfey4GsbKjUP4O3NZup0v1g1KS9obpl1nDvpfdmKhN1kUvLyQso5/77xErDTlkvlITiaWmN4XquHPX2RtV33tRuDWKgy51wot1K3IHUUl4Ws9cL66XagSmKanypR2Q5x7cTJmu0K3FSWYOfxl7V/PkMGN+9Optcsjr8w4r1Q5CCnfo9B0NbM9QMXPTD8VUHP/dwCS+yV9ErOcDOITFof7XvYa8/cY5JiwC3KhGQWD2wiv/KqDxNqKbCrokQ=='
    let method = 'Deposit'
    let uuid = '258a2184-2842-b485-25ca-293525152425'

    let privateKey = fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem'), 'utf8')

    let signature = sign(
        serialize(method, uuid, serializedData),
        privateKey
    )

    t.deepEqual(signature, signatureResult)
})

test('Should verify correctly', async t => {
    let signatureResult = 'UXh7ZdkrG4cLo0lyhF3nm+UPo/ZCM+JuUmZq6Zr4W7oygQVeWEK/Hi2Y0sjH8/aE7g39beGtFPw0IugWhETwaT/zj7GIfey4GsbKjUP4O3NZup0v1g1KS9obpl1nDvpfdmKhN1kUvLyQso5/77xErDTlkvlITiaWmN4XquHPX2RtV33tRuDWKgy51wot1K3IHUUl4Ws9cL66XagSmKanypR2Q5x7cTJmu0K3FSWYOfxl7V/PkMGN+9Optcsjr8w4r1Q5CCnfo9B0NbM9QMXPTD8VUHP/dwCS+yV9ErOcDOITFof7XvYa8/cY5JiwC3KhGQWD2wiv/KqDxNqKbCrokQ=='

    let data = 'Deposit258a2184-2842-b485-25ca-293525152425AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username'

    let publicKey = fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_public_key.pem'), 'utf8')

    let verification = verify(
        data,
        signatureResult,
        publicKey
    )

    t.true(verification)
})
