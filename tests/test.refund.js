'use strict'

var util = require('util')
var client = require('../build/main/index.js').default
var config = require('./config')

var tClientKP = client(config)

tClientKP
    .refund({
        OrderID: '3872881618',
        Amount: '1.00',
        Currency: 'EUR'
    })
    .then(function(response) {
        console.log(util.inspect(response, false, 10, true))
    })
    .catch(function(error) {
        console.log(util.inspect(error, false, 10, true))
    })
