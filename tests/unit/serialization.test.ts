import { describe, expect, it } from 'vitest'
import {
    serialize,
    trustlySerializeData,
} from '../../src/lib/trustlySerializeData'

describe('trustlySerializeData', () => {
    it('serializes the documented deposit example to the known vector', () => {
        const json = {
            Username: 'merchant_username',
            Password: 'merchant_password',
            NotificationURL: 'URL_to_your_notification_service',
            EndUserID: '12345',
            MessageID: 'your_unique_deposit_id',
            Attributes: {
                Locale: 'sv_SE',
                Currency: 'SEK',
                IP: '123.123.123.123',
                MobilePhone: '+46709876543',
                Firstname: 'John',
                Lastname: 'Doe',
                NationalIdentificationNumber: '790131-1234',
            },
            RequestDirectDebitMandate: 0,
        }

        const expected =
            'AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordRequestDirectDebitMandate0Usernamemerchant_username'

        expect(trustlySerializeData(json)).toBe(expected)
    })

    it('serializes keys in alphabetical order', () => {
        expect(trustlySerializeData({ b: '2', a: '1', c: '3' })).toBe('a1b2c3')
    })

    it('serializes null values as empty strings', () => {
        expect(trustlySerializeData({ a: null, b: 'x' })).toBe('abx')
    })

    it('keeps a 0 value (regression from 3.1.0)', () => {
        expect(trustlySerializeData({ a: 0, b: '1' })).toBe('a0b1')
    })

    it('prefixes method and uuid in serialize()', () => {
        expect(serialize('Deposit', 'uuid-1', { a: '1' })).toBe('Deposituuid-1a1')
    })
})
