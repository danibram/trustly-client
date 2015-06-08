'use strict';

var util = require('util'),
    Client    = require('../lib/index.js'),
    config    = require('./config.js'),
    expect = require('chai').expect;

var tClientKP = new Client (config);

tClientKP.init()
.then(function (tClientKP) {
    return tClientKP.deposit({
        NotificationURL: 'http://127.0.0.1:4343/notification',
        EndUserID: 'john.doe@example.com',
        MessageID: '111112111221',
        Locale: 'es_ES',
        Amount: '1.00',
        Currency: 'EUR',
        //Country: 'ES',
        //MobilePhone: null,
        //FirstName: null,
        //LastName: null,
        //NationalIdentificationNumber: null,
        //ShopperStatement: 'Test',
        //IP: '$ip',
        SuccessURL: 'http://127.0.0.1:4343/success',
        FailURL: 'http://127.0.0.1:4343/fail',
        //TemplateURL: null,
        //URLTarget: "0",º
        //SuggestedMinAmount: null,
        //SuggestedMaxAmount: null
        HoldNotifications: 1
    });
})
.then(function (response) {
    console.log(util.inspect(response, false, 20, true));
})
.fail(function (error) {
    console.log(util.inspect(error, false, 20, true));
});