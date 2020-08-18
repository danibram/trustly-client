# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.1.2"></a>
## [3.1.2](https://github.com/danibram/trustly-client/compare/v3.1.1...v3.1.2) (2020-08-18)


### Bug Fixes

* **notification-response:** Add 'FAILED' response ([f45ca35](https://github.com/danibram/trustly-client/commit/f45ca35))



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
