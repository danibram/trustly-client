'use strict';

var client = require('../lib/index.js'),
    config = require('./config.dist.js'),
    expect = require('chai').expect;

var tClientKP = client({
    privateKeyPath: './test/merchant_private_key.pem',
    publicKeyPath: './test/merchant_public_key.pem',
    username: 'USERNAME',
    password: 'PASSWORD'
});

describe('Basics Encryption: Serialization and Sign', function() {
    it('Should serialize and sort correctly', function() {
        var JsonToSerialize = {
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
            }
        },
            serializationResult =
                'AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username';

        var serializationJson = tClientKP._serializeData(JsonToSerialize);

        expect(serializationJson).to.deep.equal(serializationResult);
    });

    it('Should sign correctly', function(done) {
        var serializedData =
            'AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username',
            signatureResult =
                'UXh7ZdkrG4cLo0lyhF3nm+UPo/ZCM+JuUmZq6Zr4W7oygQVeWEK/Hi2Y0sjH8/aE7g39beGtFPw0IugWhETwaT/zj7GIfey4GsbKjUP4O3NZup0v1g1KS9obpl1nDvpfdmKhN1kUvLyQso5/77xErDTlkvlITiaWmN4XquHPX2RtV33tRuDWKgy51wot1K3IHUUl4Ws9cL66XagSmKanypR2Q5x7cTJmu0K3FSWYOfxl7V/PkMGN+9Optcsjr8w4r1Q5CCnfo9B0NbM9QMXPTD8VUHP/dwCS+yV9ErOcDOITFof7XvYa8/cY5JiwC3KhGQWD2wiv/KqDxNqKbCrokQ==',
            method = 'Deposit',
            uuid = '258a2184-2842-b485-25ca-293525152425';

        tClientKP
            .init()
            .then(function(tClientKP) {
                var signature = tClientKP._signData(method, uuid, serializedData);
                expect(signature).to.deep.equal(signatureResult);
                done();
            })
            .fail(function(error) {
                done(error);
            });
    });

    it('Should verify correctly', function(done) {
        var signatureResult =
            'UXh7ZdkrG4cLo0lyhF3nm+UPo/ZCM+JuUmZq6Zr4W7oygQVeWEK/Hi2Y0sjH8/aE7g39beGtFPw0IugWhETwaT/zj7GIfey4GsbKjUP4O3NZup0v1g1KS9obpl1nDvpfdmKhN1kUvLyQso5/77xErDTlkvlITiaWmN4XquHPX2RtV33tRuDWKgy51wot1K3IHUUl4Ws9cL66XagSmKanypR2Q5x7cTJmu0K3FSWYOfxl7V/PkMGN+9Optcsjr8w4r1Q5CCnfo9B0NbM9QMXPTD8VUHP/dwCS+yV9ErOcDOITFof7XvYa8/cY5JiwC3KhGQWD2wiv/KqDxNqKbCrokQ==',
            data =
                'Deposit258a2184-2842-b485-25ca-293525152425AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username';

        tClientKP
            .init()
            .then(function(tClientKP) {
                var signature = tClientKP._verifyData(data, signatureResult);
                expect(signature).to.deep.equal(true);
                done();
            })
            .fail(function(error) {
                done(error);
            });
    });
});
