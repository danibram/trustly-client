# Trustly Client

[![npm version](https://img.shields.io/npm/v/trustly-client.svg?style=flat-square)][npm-home-module][![GitHub license](https://img.shields.io/npm/dt/trustly-client.svg?style=flat-square)][npm-home-module][![Support link][paypal-badge]][paypal-link]

Node.js client for trustly integrations. Written in Typescript, with zero runtime dependencies since v4: requests use the native `fetch` of Node.js and UUIDs come from `crypto.randomUUID()`.

## Requirements

- Version **4.x** requires Node.js **>= 20**. It ships CJS and ESM builds with type declarations.
- If you are stuck on an older Node.js, stay on `trustly-client@^3`.

## Quickstart

### Installation

Install the module with: `npm install trustly-client` or `yarn add trustly-client`

### Migrating from v3

- `axiosRequestConfig` is gone (axios was removed). Use `timeout`, `fetchOptions` or inject your own `fetch` (see below). Requests, signing and responses behave exactly as in v3.
- If you used it for a timeout: pass `timeout: <ms>` (the default is still 2000).
- If you used it for headers: pass `fetchOptions: { headers: { ... } }`.
- If you used it for a proxy or a custom agent: pass an undici dispatcher via `fetchOptions`, or inject a whole `fetch` implementation via the `fetch` option.
- `utils.root` was removed. Trustly's public keys are now embedded in the library (also shipped as `.pem` files in `keys/`) and exported as `TRUSTLY_PROD_PUBLIC_KEY` / `TRUSTLY_TEST_PUBLIC_KEY`.
- The `endpoint` config option now works (it was ignored in v3).

### Usage

In versions **>3.0.0** all validations are removed and you are free to pass every parameter you like. For older changelog go to the tags **<3.0.0**

```javascript
// In Vanilla javascript
var client = require('trustly-client').default // Import it
var tClientKP = client(configuration) // Fill the configuration

tClientKP // Ready to use
    .deposit(
        {
            NotificationURL: 'http://127.0.0.1:4343/notification',
            EndUserID: 'john.doe@example.com',
            MessageID: '111112111221',
        },
        {
            Locale: 'es_ES',
            Amount: '1.00',
            Currency: 'EUR',
            SuccessURL: 'http://127.0.0.1:4343/success',
            FailURL: 'http://127.0.0.1:4343/fail',
        }
    )
    .then(function (response) {
        console.log(util.inspect(response, false, 20, true))
    })
    .catch(function (error) {
        console.log(util.inspect(error, false, 20, true))
    })

// In Typescript
import client from 'trustly-client' // Import it
let tClient = client(configuration) // Fill the configuration

tClientKP // Ready to use
    .deposit(
        {
            NotificationURL: 'http://127.0.0.1:4343/notification',
            EndUserID: 'john.doe@example.com',
            MessageID: '111112111221',
        },
        {
            Locale: 'es_ES',
            Amount: '1.00',
            Currency: 'EUR',
            SuccessURL: 'http://127.0.0.1:4343/success',
            FailURL: 'http://127.0.0.1:4343/fail',
        }
    )
    .then(function (response) {
        console.log(util.inspect(response, false, 20, true))
    })
    .catch(function (error) {
        console.log(util.inspect(error, false, 20, true))
    })
```

## Documentation

### Initialization

After import the library you must configure it with your data:

```javascript
import client from 'trustly-client' // Import it
let tClient = client({
    username: '', // required
    password: '', // required
    privateKeyPath: '', // required
    publicKeyPath: '', // optional
    endpoint: '', // optional
    environment: '', // optional (But required in production, see below!)
}) // Fill the configuration
```

This configuration is an object and this is the structure:

-   [required] 'username': Your trustly api username
-   [required] 'password': Your trustly api password
-   [required] 'privateKeyPath' or 'privateKey': Path to your private key, or the key itself as a string
-   [optional] 'publicKeyPath' or 'publicKey': Path to a public key, or the key itself as a string (for the general cases you don't need it, the trustly public keys are embedded in the library)
-   [optional] 'endpoint': Overrides the URL the client calls. By default is selected depending of the environment.
-   [optional] 'environment': By default is "development", and it does the http calls to trustly development environment (`https://test.trustly.com/api/1`), if you pass production it turns to `https://trustly.com/api/1`, so remember to change that variable when you go to production
-   [optional] 'timeout': Request timeout in milliseconds, default 2000
-   [optional] 'fetchOptions': Extra options merged into every fetch call (headers, an undici dispatcher for proxies, etc.). Applied last, so they win over the defaults.
-   [optional] 'fetch': An alternative fetch implementation. By default the global fetch of Node.js is used. Anything with the same call shape works: undici's fetch, node-fetch, a wrapper adding interceptors, or a mock in tests.

```javascript
// Example: inject a fetch that goes through a corporate proxy
import { fetch as undiciFetch, ProxyAgent } from 'undici'

const dispatcher = new ProxyAgent('http://proxy.corp.local:8080')
let tClient = client({
    username,
    password,
    privateKeyPath,
    fetch: (url, init) => undiciFetch(url, { ...init, dispatcher }),
})
```

### Usage

This are the methods availables, every method accepts `data` and `params` and are the same that you have to send to trustly.

-   **'deposit'** : Create a deposit request.
-   **'refund'** : Create a refund request.
-   **'selectAccount'** : Create a select account request.
-   **'charge'** : Create a charge request.
-   **'withdraw'** : Create a withdraw request.
-   **'approveWithdrawal'** : Create a approve withdrawal request.
-   **'denyWithdrawal'** : Create a deny withdrawal request.
-   **'accountPayout'** : Create a account payout request.

-   **'request'** : This creates a free request to trustly, use only for testing propouses, you have to pass this parameters `(method, params, attributes)`, and it compose and sign the trustly structure.
-   **'createNotificationResponse'** : Helper that: - Verify the signature and the data from trustly - Compose the data you need to send to trustly to answer the notifications, it will be returned as an output from this method. The output should be like:

        ```
        {
            "result": {
                "signature": "R9+hjuMqbsH0Ku ... S16VbzRsw==",
                "uuid": "258a2184-2842-b485-25ca-293525152425",
                "method": "credit",
                "data": {
                    "status": "..."
                }
            },
            "version":"1.1"
        }
        ```

    In the oficial docs you have all you need to manage the data [trustly official doc](https://trustly.com/en/developer/api#/notifications)

-   **'verifyAndParseNotification'** : Helper to verify and parse Json the notification response
-   **'composeNotificationResponse'** : Helper to compose the notification response, its accepts also custom data to send it back. You can use both (**verifyAndParseNotification**,**composeNotificationResponse**) as replacement of **createNotificationResponse**.

```javascript
console.log('- Notification is comming. √')
tClient
    .createNotificationResponse(req.body)
    .then(function (data) {
        console.log(util.inspect(data, false, 20, true))
        res.send(data)
    })
    .catch(function (error) {
        console.log('_Error')
        console.log(util.inspect(error, false, 20, true))
    })

// -------------------- OR ----------------------//

console.log('- Notification is comming. √')
tClient
    .verifyAndParseNotification(req.body)
    .then(function (notification) {
        return composeNotificationResponse(notification, {
            status: 'OK',
            ...aditionalData,
        })
    })
    .then(function (data) {
        console.log(util.inspect(data, false, 20, true))
        res.send(data)
    })
    .catch(function (error) {
        console.log('_Error')
        console.log(util.inspect(error, false, 20, true))
    })
```

All trustly methods (deposit, refund, selectAccount, charge, withdraw, approveWithdrawal, denyWithdrawal) uses the parameters described in trusty documentation. [here (trustly docs)](https://trustly.com/en/developer/api#/introduction).
If is something missing please make a pull request or write an issue.

Method **'createNotificationResponse'** accepts a Json string or a Json with the notification, and compose for you te correct response for Trustly. See [tests/notification-server/test-notification-server.js](https://github.com/danibram/trustly-client/blob/master/tests/notification-server/test-notification-server.js), inside you have an already express server that you can deploy anywhere (dont forget to update with your configuration), and test the notifications.

Also it is exported helpers to sign, verify, interfaces, all configuration etc... So feel free to use it, if there is any doubt dont be shy, write an issue, a pull request or an email to me.

## Error Management

Managing errors is the key of a client, so for that trustly client always send the lastRequest and lastResponse (If there it be), and also i parse the most important parts for you according to the documentation, the final structure, is:

```javascript
var error = {
    lastRequest: self._lastRequest,
    lastResponse: self._lastResponse,
    trustlyError: null,
    clientError: null,
}
```

It seems to long but sometimes you must understand the request and the response.

If _clientError_ is filled, means that the error not comes from trustly.
If _trustlyError_ is filled, it will catch all information about the trustly error in this format (Example):

```javascript
trustlyError = {
    method: 'Deposit',
    uuid: 'dba2d98c-6c4e-4b9e-aa46-90027793aa14',
    message: 'ERROR_DUPLICATE_MESSAGE_ID',
    code: 637,
}
```

_Note: method and uuid can be null if the request contains a malformed JSON_
More information about the errors [here (trustly docs)](https://trustly.com/en/developer/api#/errormessages)

## Release History

See [CHANGELOG.md](https://github.com/danibram/trustly-client/blob/master/CHANGELOG.md)

## License

Licensed under the MIT license. 2021

[npm-home-module]: https://www.npmjs.com/package/trustly-client
[paypal-badge]: https://img.shields.io/badge/❤%20support-paypal-blue.svg?style=flat-square
[paypal-link]: https://www.paypal.me/danibram
