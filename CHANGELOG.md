# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.0.0"></a>

# [4.0.0](https://github.com/danibram/trustly-client/compare/v3.2.1...v4.0.0) (2026-08-31)

Modernization release, closes [#43](https://github.com/danibram/trustly-client/issues/43). Zero runtime dependencies.

### Breaking changes

-   Requires Node.js >= 20.
-   axios removed, requests now use the native `fetch`. The `axiosRequestConfig` config option is gone; use `timeout` (ms, default still 2000, 0 disables it), `fetchOptions` (headers merged with the defaults, signal combined with the timeout, method/body protected) or `fetch` (inject your own implementation: undici with a proxy, node-fetch, mocks...).
-   `endpoint` config option is honored. v3 accepted it in the types but ignored it, so audit your configs before upgrading: a stale value will now receive your credentials.
-   Transport error identity changed inside `clientError`: network failures are `TypeError('fetch failed')` (cause in `.cause`) instead of axios errors with `code`, timeouts are a `DOMException` named `TimeoutError` instead of `code: 'ECONNABORTED'`. Non-2xx still rejects with `Request failed with status code N` plus a `status` property.
-   Trustly JSON-RPC errors land directly in `err.trustlyError` as the README always documented. A v3 bug double-wrapped them into `err.clientError.trustlyError`.
-   `uuid` dependency removed, UUIDs come from `crypto.randomUUID()`.
-   `utils.root` removed. Trustly's public keys are embedded and exported as `TRUSTLY_PROD_PUBLIC_KEY` / `TRUSTLY_TEST_PUBLIC_KEY` (the `.pem` files are shipped and importable via `trustly-client/keys/*`).

### Features

-   New `publicKey` config option to pass the key inline, mirroring `privateKey`.
-   Dual CJS + ESM build with type declarations (`exports` map), built with tsup.
-   Unit test suite (vitest, 50 tests) covering serialization, signing, notifications, the HTTP flow, error shapes and the embedded keys; CI on GitHub Actions (Node 20/22/24).

### Fixes and hardening

-   Responses are now bound to their request: a validly signed result whose `uuid` or `method` does not match the outgoing request is rejected.
-   Non-2xx responses reject even if the body carries a signed result (v3 semantics restored; the fetch rewrite initially dropped this).
-   `lastResponse` keeps the raw body when it is not JSON (WAF pages, HTML 502s).
-   The API password is redacted in the error envelope's `lastRequest`.
-   Concurrent requests no longer cross-contaminate each other's error reports.
-   A wrong key path no longer crashes the process at construction; it surfaces on the first call.
-   `parseError` no longer crashes on Trustly error bodies without nested details.

<a name="3.2.1"></a>

# [3.2.1](https://github.com/danibram/trustly-client/compare/v3.2.0...v3.2.1) (2021-07-23)

### Features:

Added 2 new functions to make notifications more customizable:

-   verifyAndParseNotification
-   composeNotificationResponse

<a name="3.2.0"></a>

# [3.2.0](https://github.com/danibram/trustly-client/compare/v3.1.3...v3.2.0) (2021-03-22)

### Features

-   **axios:** Make it possible to supply axios config ([1e1f77c](https://github.com/danibram/trustly-client/commit/1e1f77c))
-   **now you can override axios config:** added "axiosRequestConfig" field to override axios client configuration ([a84f7e2](https://github.com/danibram/trustly-client/commit/a84f7e2))

<a name="3.1.3"></a>

## [3.1.3](https://github.com/danibram/trustly-client/compare/v3.1.2...v3.1.3) (2020-08-25)

## Now is live, 3.1.2 was a bad build

### Bug Fixes

-   **notification-response:** Add 'FAILED' response ([f45ca35](https://github.com/danibram/trustly-client/commit/f45ca35))

<a name="3.1.2"></a>

## [3.1.2](https://github.com/danibram/trustly-client/compare/v3.1.1...v3.1.2) (2020-08-18)

### Bug Fixes

-   **notification-response:** Add 'FAILED' response ([f45ca35](https://github.com/danibram/trustly-client/commit/f45ca35))

<a name="3.1.1"></a>

# [3.1.1](https://github.com/danibram/trustly-client/compare/v3.1.0...v3.1.1) (2020-08-10)

### Bug Fixes

-   **Typescript:** Now the Client Class is exported, thanks @zappen999 ([750885c](https://github.com/danibram/trustly-client/commit/750885c))

<a name="3.1.0"></a>

# [3.1.0](https://github.com/danibram/trustly-client/compare/v3.0.1...v3.1.0) (2020-02-07)

### Bug Fixes

-   **serialization:** fix over 0 case omited ([b6780fb](https://github.com/danibram/trustly-client/commit/b6780fb))

### Features

-   **chore:** added example for testing the serialization ([9b7135f](https://github.com/danibram/trustly-client/commit/9b7135f))

<a name="3.0.1"></a>

## [3.0.1](https://github.com/danibram/trustly-client/compare/v3.0.0...v3.0.1) (2018-10-24)

### Bug Fixes

-   **packages:** update libs
-   **package:** update axios to version 0.18.0 ([b75a646](https://github.com/danibram/trustly-client/commit/b75a646))
-   **serialization:** Fix serializing arrays ([11dd576](https://github.com/danibram/trustly-client/commit/11dd576))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/danibram/trustly-client/compare/v2.1.0...v3.0.0) (2018-02-05)

### Bug Fixes

-   Modified README to 3.0.0 ([4a7c2b5](https://github.com/danibram/trustly-client/commit/4a7c2b5))

### Features

-   **chore:** make better interfaces and specs ([3dbacf0](https://github.com/danibram/trustly-client/commit/3dbacf0))
-   **chore:** remove validations, and clean up some code ([e1cded1](https://github.com/danibram/trustly-client/commit/e1cded1))

<a name="2.0.7"></a>

# [2.0.7](https://github.com/danibram/trustly-client/compare/v2.0.5...v2.0.7) (2017-12-19)

### Updates

-   Added credit method thanks to @karteekkommana

### Fixes

-   Fix a field on SelectAccount

<a name="2.0.5"></a>

# [2.0.5](https://github.com/danibram/trustly-client/compare/v2.0.0...v2.0.5) (2017-12-12)

### Updates

-   Better configuration

### Fixes

-   Fixes on examples
-   Fix on create notification response
-   Fix some bugfixes on serialization data

<a name="2.0.0"></a>

# [2.0.0](https://github.com/danibram/trustly-client/compare/v1.3.7...v2.0.0) (2017-11-21)

### Features

-   Rewrite completely in typescript
-   Remove unused libs
-   Promise style
-   You dont need to use anymore init(), it automatically do for you
-   And more... Stay tuned

### Deprecations

-   No more `.init()`
-   No more callback style

<a name="1.3.7"></a>

## [1.3.7](https://github.com/danibram/trustly-client/compare/v1.3.6...v1.3.7) (2017-11-21)

### Fixes

-   Fix Error on serialization

<a name="1.3.5"></a>

## [1.3.5](https://github.com/danibram/trustly-client/compare/v1.2.0...v1.3.5) (old)

### Features

-   Added RequestDirectDebitMandate in deposit
-   Added withdraw (thanks @rizr)
-   Added approveWithdrawal (thanks @rizr)
-   Added denyWithdrawal (thanks @rizr)

### Fixes

-   Remaining field in charge method
-   Use uuid instead node-uuid
-   Updated all attributes

<a name="1.2.0"></a>

## [1.2.0](https://github.com/danibram/trustly-client/compare/v1.1.3...v1.2.0) (old)

### Features

-   Added charge (thanks @Iteam1337)
-   Added select account (thanks @Iteam1337)

<a name="1.1.3"></a>

## [1.1.3](https://github.com/danibram/trustly-client/compare/v1.1.1...v1.1.3) (old)

### Features

-   Working for Deposit, Refund and management of notifications.

### Fixes

-   Better management of the errors.
-   Correct and fix refund.

<a name="1.1.1"></a>

## [1.1.1](https://github.com/danibram/trustly-client/compare/v1.1.0...v1.1.1) (old)

### Fixes

-   Fix problems with notifications some example updates.

<a name="1.1.0"></a>

## [1.1.0](https://github.com/danibram/trustly-client/compare/v1.0.4...v1.1.0) (old)

### Fixes

-   Correct notifications handling, remove "handleNotification" is replaced by "createNotificationResponse", more correct, and added an express server as example.

<a name="1.0.4"></a>

## [1.0.4](https://github.com/danibram/trustly-client/compare/v1.0.4...v1.0.4) (old)

### Features

-   Updates in packages.
-   Update the load method.
-   Added callback example.
-   Fix paths, problems with the keys.

<a name="1.0.0"></a>

## [1.0.0]() (old)

### Features

-   Firsts release.
-   Added Deposit
-   Added Refund
-   Added handleNotification functions.
-   Added Sign
-   Added verify
-   Added compose requests, and responses done.
