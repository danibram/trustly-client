# Trustly Client
[![Dependency Status](https://david-dm.org/danibram/trustly-client.svg)](https://david-dm.org/danibram/bumblebee)

Node.js client for trusty integrations. Right now it doesn´t includes the withdrawal, feel free to submit a pull request. You can use callback style or promises.


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
            FailURL: 'http://127.0.0.1:4343/fail',
            HoldNotifications: 1
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

Basically you should pass, the config object composed by:

- [required] 'privateKeyPath': Path to you private key
- [required] 'username': Your trustly api username
- [required] 'password': Your trustly api password 
- [optional] 'publicKeyPath': Path to a public key (for the general cases you don't need it, i package the trusty public key)
- [optional] 'endpoint': By default it is autoselected depending of the environment, you can always send the endpoint you want.
- [optional] 'environment': By default i fill with development

The 2 basic methods are: deposit, refund. They uses the parameters described in trusty documentation.
Then you have a method to handle the notifications: handleNotification. Accepts a Json string or a Json object, with the notification.

Also there are other functions to sign, verify the data, compose the request. Feel free to explore the code.
More information about the methods here -> <a href="https://trustly.com/en/developer/api#/introduction" title="Link to Trustly Developers Docs">Trustly Developers Docs</a>

## Release History
####(1.0.4 Lastest)
- Fix paths, problems with the keys.

####(1.0.3 Lastest)
- Update README

####(1.0.2 Lastest)
- Update the load method. 
- Added callback example.

####(1.0.1 Lastest)
- Updates in packages. 

####(1.0.0)
- Firsts steps. Basic usage finishes: Deposit, refund and handleNotification functions.
- Sign, verify and compose requests, and responses done. 

## License
Licensed under the MIT license. 2015