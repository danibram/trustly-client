var lib = require('../build/main/index.js')
var serialization = lib.helpers.trustlySerializeData

var json = {
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
        NationalIdentificationNumber: '790131-1234'
    },
    RequestDirectDebitMandate: 0
}

var result =
    'AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordRequestDirectDebitMandate0Usernamemerchant_username'

console.log(serialization(json) === result)