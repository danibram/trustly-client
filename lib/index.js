/*
 * trustly-client
 *
 *
 * Copyright (c) 2014 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

var request = require('request'),
    fs = require('fs'),
    util = require('util'),
    Q = require('q'),
    uuid = require('node-uuid'),
    crypto = require('crypto'),
    Method = require('./method'),
    extend = require('node.extend');

var TrustlyConstructor = function(config) {
    var self = this;
    self.config = {};
    self.privateKey = null;
    self.publicKey = null;

    /*
        Specifications for every method
    */

    self.specs = {
        deposit: {
            method: 'Deposit',
            dataFields: ['NotificationURL', 'EndUserID', 'MessageID'],
            attributesFields: [
                'Locale',
                'Amount',
                'Currency',
                'Country',
                'MobilePhone',
                'Firstname',
                'Lastname',
                'NationalIdentificationNumber',
                'ShopperStatement',
                'IP',
                'SuccessURL',
                'FailURL',
                'TemplateURL',
                'URLTarget',
                'SuggestedMinAmount',
                'SuggestedMaxAmount',
                'IntegrationModule'
            ],
            requiredFields: ['NotificationURL', 'EndUserID', 'MessageID', 'Currency']
        },
        refund: {
            method: 'Refund',
            dataFields: ['OrderID', 'Amount', 'Currency'],
            attributesFields: [],
            requiredFields: ['OrderID', 'Amount', 'Currency']
        },
        selectAccount: {
            method: 'SelectAccount',
            dataFields: ['NotificationURL', 'EndUserID', 'MessageID'],
            attributesFields: [
                'Locale',
                'Country',
                'MobilePhone',
                'Firstname',
                'Lastname',
                'DateOfBirth',
                'NationalIdentificationNumber',
                'IP',
                'SuccessURL',
                'FailURL',
                'TemplateURL',
                'URLTarget',
                'RequestDirectDebitMandate'
            ],
            requiredFields: ['NotificationURL', 'EndUserID', 'MessageID']
        },
        charge: {
            method: 'Charge',
            dataFields: [
                'AccountID',
                'NotificationURL',
                'EndUserID',
                'MessageID',
                'Amount',
                'Currency'
            ],
            attributesFields: ['ShopperStatement'],
            requiredFields: [
                'AccountID',
                'NotificationURL',
                'EndUserID',
                'MessageID',
                'Amount',
                'Currency'
            ]
        },
        withdraw: {
            method: 'Withdraw',
            dataFields: ['NotificationURL', 'EndUserID', 'MessageID', 'Currency'],
            attributesFields: [
                'Locale',
                'Country',
                'MobilePhone',
                'DateOfBirth',
                'Firstname',
                'Lastname',
                'NationalIdentificationNumber',
                'ShopperStatement',
                'IP',
                'SuccessURL',
                'FailURL',
                'TemplateURL',
                'URLTarget',
                'SuggestedMinAmount',
                'SuggestedMaxAmount',
                'IntegrationModule'
            ],
            requiredFields: [
                'NotificationURL',
                'EndUserID',
                'MessageID',
                'Currency',
                'Firstname',
                'Lastname',
                'Email',
                'DateOfBirth'
            ]
        },
        approveWithdrawal: {
            method: 'ApproveWithdrawal',
            dataFields: ['OrderID'],
            attributesFields: [],
            requiredFields: ['OrderID']
        },
        denyWithdrawal: {
            method: 'DenyWithdrawal',
            dataFields: ['OrderID'],
            attributesFields: [],
            requiredFields: ['OrderID']
        }
    };

    /*
        Init Class, depending on the environment
    */

    if (config.environment === 'production') {
        self.config = extend(
            {
                publicKeyPath: __dirname + '/keys/trustly.com.public.pem',
                endpoint: 'https://trustly.com/api/1'
            },
            config
        );
    } else {
        self.config = extend(
            {
                publicKeyPath: __dirname + '/keys/test.trustly.com.public.pem',
                endpoint: 'https://test.trustly.com/api/1',
                environment: 'development'
            },
            config
        );
    }

    self.init = function(callback) {
        var deferred = Q.defer();

        self
            ._loadKeys()
            .then(function() {
                var kys = Object.keys(self.specs);

                for (var i = 0; i < kys.length; i++) {
                    var k = kys[i], config = self.specs[k];
                    var method = new Method(config, self);
                    self[k] = method.exec;
                }

                deferred.resolve();
            })
            .fail(function(error) {
                deferred.reject(error);
            });

        deferred.promise.nodeify(callback);
        return deferred.promise;
    };

    /*
        Methods
    */

    self.deposit = function() {};
    self.refund = function() {};
    self.selectAccount = function() {};
    self.charge = function() {};
    self.withdraw = function() {};
    self.approveWithdrawal = function() {};
    self.denyWithdrawal = function() {};

    self.createNotificationResponse = function(notification, callback) {
        var deferred = Q.defer();

        Q.fcall(function() {
            if (typeof value === 'string') {
                try {
                    notification = JSON.parse(notification);
                } catch (error) {
                    throw new Error('Cant parse to JSON the notification.');
                }
            }

            self._lastNotification = notification;
            var dataToVerify =
                notification.method +
                notification.params.uuid +
                self._serializeData(notification.params.data);

            var v = self._verifyData(dataToVerify, notification.params.signature);

            if (!v) {
                throw new Error('Cant verify the response.');
            }

            return notification;
        })
            .then(self._prepareNotificationResponse)
            .then(function(response) {
                deferred.resolve(response);
            })
            .fail(function(error) {
                deferred.reject({
                    error: error,
                    lastNotification: self._lastNotification
                });
            });

        deferred.promise.nodeify(callback);
        return deferred.promise;
    };

    /*
        Utils
    */

    self._loadKeys = function() {
        var deferred = Q.defer();

        fs.readFile(self.config.publicKeyPath, 'utf8', function(err, publicKey) {
            if (err) return deferred.reject(err);
            self.publicKey = publicKey;

            if (!self.config.privateKeyPath && !self.config.privateKey) {
                deferred.reject(
                    'No key param found, please  provide one (privateKey or privateKeyPath).'
                );
            }

            if (!self.config.privateKey && self.config.privateKeyPath) {
                fs.readFile(self.config.privateKeyPath, 'utf8', function(
                    err,
                    privateKey
                ) {
                    if (err) return deferred.reject(err);

                    self.privateKey = privateKey;

                    deferred.resolve();
                });
            } else {
                self.privateKey = privateKey;

                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    self._prepareRequest = function(method, data, attributes) {
        var req = {
            params: null,
            method: null,
            version: '1.1'
        },
            Data = {};

        if (data) {
            Data = data;
        }
        Data.Attributes = null;
        if (attributes) {
            Data.Attributes = attributes;
        }
        req.params = {
            Data: Data,
            UUID: uuid.v4()
        };

        if (method) {
            req.method = method;
        }

        req.params.Data.Username = self.config.username;
        req.params.Data.Password = self.config.password;

        var sign = self._signData(
            req.method,
            req.params.UUID,
            self._serializeData(req.params.Data)
        );

        req.params.Signature = sign;

        return req;
    };

    self._prepareNotificationResponse = function(notification) {
        var req = {
            result: {
                signature: '',
                uuid: notification.params.uuid,
                method: notification.method,
                data: {
                    status: 'OK'
                }
            },
            version: '1.1'
        };

        var sign = self._signData(
            notification.method,
            notification.params.uuid,
            self._serializeData(req.result.data)
        );

        req.result.signature = sign;

        return req;
    };

    self._signData = function(method, uuid, data) {
        var dataSerialized = method + uuid + data;

        var signer = crypto.createSign('RSA-SHA1');
        signer.update(dataSerialized, 'utf8');

        return signer.sign(self.privateKey, 'base64');
    };

    self._verifyData = function(data, signature) {
        var verifier = crypto.createVerify('RSA-SHA1');
        verifier.update(data, 'utf8');

        return verifier.verify(self.publicKey, signature, 'base64');
    };

    self._serializeData = function(data) {
        if (Object.prototype.toString.call(data) === '[object Object]') {
            var keys = Object.keys(data), serializedData = '';
            keys.sort();
            //self._ksort(keys);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];

                serializedData = serializedData + k + self._serializeData(data[k]);
            }
            return serializedData;
        } else {
            return data.toString();
        }
    };

    self._verifyResponse = function(res) {
        var data = res.method + res.uuid + self._serializeData(res.data);
        var v = self._verifyData(data, res.signature);
        if (!v) {
            throw new Error('clientError: Cant verify the response.');
        }
        return res.data;
    };

    self._makeRequest = function(reqParams) {
        self._lastRequest = reqParams;
        self._lastResponse = null;
        var deferred = Q.defer(),
            parseErr = function(err) {
                var error = {
                    lastRequest: self._lastRequest,
                    lastResponse: self._lastResponse,
                    trustlyError: null,
                    clientError: null
                };
                if (err && err.error) {
                    var tError = {};

                    tError.method = err.error.error.method
                        ? err.error.error.method
                        : null;
                    tError.uuid = err.error.error.uuid ? err.error.error.uuid : null;
                    tError.message = err.error.message ? err.error.message : null;
                    tError.code = err.error.code ? err.error.code : null;

                    error.trustlyError = tError;
                } else {
                    error.clientError = err;
                }

                deferred.reject(error);
            };

        //console.log(util.inspect(reqParams, false,20,true));

        var options = {
            method: 'POST',
            url: self.config.endpoint,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(reqParams),
            timeout: 20000
        };

        request(options, function(err, response, body) {
            if (err) {
                parseErr('clientError: ' + err);
            }

            Q.fcall(function() {
                self._lastResponse = body;
                return JSON.parse(body);
            })
                .then(function(trustlyResponse) {
                    self._lastResponse = trustlyResponse;

                    if (trustlyResponse.result) {
                        deferred.resolve(self._verifyResponse(trustlyResponse.result));
                    } else if (trustlyResponse.error) {
                        parseErr(trustlyResponse);
                    } else {
                        parseErr(
                            'clientError: Cant parse the response, check the lastResponse.'
                        );
                    }
                })
                .fail(function(error) {
                    parseErr(error);
                });
        }).on('error', function(err) {
            parseErr('clientError: ' + err);
        });

        return deferred.promise;
    };
};

module.exports = function createTrustlyClient(config) {
    return new TrustlyConstructor(config);
};
