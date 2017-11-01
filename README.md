# Trustly Client
[![Dependency Status](https://david-dm.org/danibram/trustly-client.svg)](https://david-dm.org/danibram/trustly-client)

Node.js client for trusty integrations.


##Getting started

Install the module with: `npm install trustly-client`

```javascript
    var client = require('trustly-client');
    var tClientKP = client(configuration);
    //Promise style
    tClientKP.init()
    .then(function () {
        return tClientKP.deposit({
            NotificationURL: 'http://127.0.0.1:4343/notification',
            EndUserID: 'john.doe@example.com',
            MessageID: '111112111221',
            Locale: 'es_ES',
            Amount: '1.00',
            Currency: 'EUR',
            SuccessURL: 'http://127.0.0.1:4343/success',
            FailURL: 'http://127.0.0.1:4343/fail',
            HoldNotifications: 1
        });
    })
    .then(function (response) {
        console.log(util.inspect(response, false, 20, true));
    })
    .fail(function (error) {
        console.log(util.inspect(error, false, 20, true));
    });
    //Callback style
    tClientKP.init(function(){
        tClientKP.deposit({
            NotificationURL: 'http://127.0.0.1:4343/notification',
            EndUserID: 'john.doe@example.com',
            MessageID: '111112111221',
            Locale: 'es_ES',
            Amount: '1.00',
            Currency: 'EUR',
            SuccessURL: 'http://127.0.0.1:4343/success',
            FailURL: 'http://127.0.0.1:4343/fail'
        },function(err, response){
            if (err){
                console.log(util.inspect(err, false, 20, true));
            }
            console.log(util.inspect(response, false, 20, true));
        });
    })
```

You should init, and it is a asyncronous process. This init loads your private and the trustly public keys, neccesary for all the request and responses, creation and verification.

## Documentation

Basically to initialize, you should pass, the config object composed by:

- [required] 'privateKeyPath': Path to you private key
- [required] 'username': Your trustly api username
- [required] 'password': Your trustly api password
- [optional] 'publicKeyPath': Path to a public key (for the general cases you don't need it, i package the trusty public key)
- [optional] 'endpoint': By default it is autoselected depending of the environment, you can always send the endpoint you want.
- [optional] 'environment': By default i fill with development

The module have this 3 basic methods:

- **'deposit'** : Create a deposit request.
- **'refund'** : Create a refund request.
- **'createNotificationResponse'** : Helper that verifies the data from truistly using the keys, and returns the data you need to response to every notification, returns an *object*.

The 2 basic methods are: **deposit**, **refund**. They uses the parameters described in trusty documentation. [here (trustly docs)](https://trustly.com/en/developer/api#/introduction)

Then you have a method to handle the notifications: **'createNotificationResponse'**. Accepts a Json string or a Json with the notification, and returns you the correct data, then you simply need to send as a reponse in you notification listener. (see **test/test-notification-server.js** you have an example about it)

Also there are other functions to sign, verify the data, compose the request. Feel free to explore the code.

## Errors

It will return always the same structure if an error happens:
```javascript
    var error = {
        lastRequest: self._lastRequest,
        lastResponse: self._lastResponse,
        trustlyError: null,
        clientError: null
    };
```
Always you will have last request and response.
If *clientError* is filled, mean all errors except trustly errors.
If *trustlyError* is filled, it will catch all information about the trustly error in this format (Example):
```javascript
    trustlyError = {
        method: 'Deposit',
        uuid: 'dba2d98c-6c4e-4b9e-aa46-90027793aa14',
        message: 'ERROR_DUPLICATE_MESSAGE_ID',
        code: 637
    };
```
*Note: method and uuid can be null if the request contains a malformed JSON*
More information about the errors [here (trustly docs)](https://trustly.com/en/developer/api#/errormessages)

## Release History
####(1.3.2 Lastest)
- Updated all attributes
- Added RequestDirectDebitMandate in deposit
- Added withdraw (thanks @rizr)
- Added approveWithdrawal (thanks @rizr)
- Added denyWithdrawal (thanks @rizr)

####(1.2.0)
- Added charge (thanks @Iteam1337)
- Added select account (thanks @Iteam1337)

####(1.1.3)
- Working for Deposit, Refund and management of notifications.
- Better management of the errors.
- Correct and fix refund.

####(1.1.1)
- Fix problems with notifications some example updates.

####(1.1.0)
- Correct notifications handling, remove "handleNotification" is replaced by "createNotificationResponse", more correct, and added an express server as example.

####(1.0.1 - 1.0.4)
- Updates in packages.
- Update the load method.
- Added callback example.
- Fix paths, problems with the keys.

####(1.0.0)
- Firsts steps. Basic usage finishes: Deposit, refund and handleNotification functions.
- Sign, verify and compose requests, and responses done.

## License
Licensed under the MIT license. 2017