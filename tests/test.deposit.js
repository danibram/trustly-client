'use strict'

var util = require('util')
var client = require('../build/main/index.js').default
var config = require('./config')

var tClientKP = client(config)

tClientKP
    .deposit({
        NotificationURL: 'http://127.0.0.1:4343/notification',
        EndUserID: 'john.doe@example.com',
        MessageID: '13231231434561212',
        Locale: 'es_ES',
        Amount: '1.00',
        Currency: 'EUR',
        //Country: 'ES',
        //MobilePhone: null,
        //FirstName: null,
        //LastName: null,
        //NationalIdentificationNumber: null,
        //ShopperStatement: 'Test',
        SuccessURL: 'http://127.0.0.1:4343/success',
        FailURL: 'http://127.0.0.1:4343/fail'
        //TemplateURL: null,
        //URLTarget: "0",º
        //SuggestedMinAmount: null,
        //SuggestedMaxAmount: null
    })
    .then(function(response) {
        console.log(util.inspect(response, false, 20, true))
    })
    .catch(function(error) {
        console.log(util.inspect(error, false, 20, true))
    })
