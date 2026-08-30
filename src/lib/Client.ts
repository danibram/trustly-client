import { randomUUID } from 'crypto'
import { ConfigInterface, FetchLike } from '../Interfaces'
import { TRUSTLY_PROD_PUBLIC_KEY, TRUSTLY_TEST_PUBLIC_KEY } from '../keys'
import {
    accountPayout,
    approveWithdrawal,
    balance,
    charge,
    denyWithdrawal,
    deposit,
    refund,
    selectAccount,
    withdraw,
} from '../specs'
import { serialize } from './trustlySerializeData'
import { parseError, readFile, sign, verify } from './utils'

export class Client {
    endpoint: string = 'https://test.trustly.com/api/1'
    environment: 'development' | 'production' | 'prod' | 'p' = 'development'
    username: string = ''
    password: string = ''

    timeout: number
    fetchOptions: Record<string, any>
    fetchImpl: FetchLike | undefined

    privateKeyPath: string | undefined
    publicKeyPath: string | undefined

    privateKey: string | undefined
    publicKey: string

    _lastRequest: any
    _lastResponse: any

    ready: Promise<any>

    constructor(config: ConfigInterface) {
        let isProd =
            config.environment &&
            ['production', 'prod', 'p'].indexOf(config.environment) > -1

        this.publicKeyPath = config.publicKeyPath

        this.endpoint = config.endpoint
            ? config.endpoint
            : isProd
              ? 'https://trustly.com/api/1'
              : 'https://test.trustly.com/api/1'
        this.environment = isProd ? 'production' : 'development'
        this.publicKey = config.publicKey
            ? config.publicKey
            : isProd
              ? TRUSTLY_PROD_PUBLIC_KEY
              : TRUSTLY_TEST_PUBLIC_KEY

        if (!config.username) {
            throw `No username provided, please provide one.`
        }

        if (!config.password) {
            throw `No password provided, please provide one.`
        }

        if (!config.privateKeyPath && !config.privateKey) {
            throw `No privateKeyPath or privateKey provided, please provide one.`
        }

        this.username = config.username
        this.password = config.password
        this.privateKeyPath = config.privateKeyPath
        this.privateKey = config.privateKey
        this.timeout = config.timeout || 2000
        this.fetchOptions = config.fetchOptions || {}
        this.fetchImpl = config.fetch
        this.ready = this._init()
    }

    public _createMethod = (method) => async (params, attributes) => {
        await this.ready
        let req = this._prepareRequest(method, params, attributes)
        return this._makeRequest(req)
    }

    _prepareRequest(method, data = {}, attributes?) {
        let req = {
            method,
            params: {},
            version: '1.1',
        }

        let UUID = randomUUID()

        let Data = Object.assign({}, data, {
            Attributes: attributes ? attributes : null,
            Username: this.username,
            Password: this.password,
        })

        req.params = {
            Data: Data,
            UUID: UUID,
            Signature: sign(serialize(method, UUID, Data), this.privateKey),
        }

        return req
    }

    _verifyResponse = function (res) {
        let data = serialize(res.method, res.uuid, res.data)
        let v = verify(data, res.signature, this.publicKey)
        if (!v) {
            throw new Error('clientError: Cant verify the response.')
        }
    }

    _prepareNotificationResponse = function (
        notification,
        status: 'OK' | 'FAILED' = 'OK'
    ) {
        let req = {
            result: {
                signature: '',
                uuid: notification.params.uuid,
                method: notification.method,
                data: { status },
            },
            version: '1.1',
        }

        req.result.signature = sign(
            serialize(
                notification.method,
                notification.params.uuid,
                req.result.data
            ),
            this.privateKey
        )

        return req
    }

    composeNotificationResponse = function (notification, data = {}) {
        let req = {
            result: {
                signature: '',
                uuid: notification.params.uuid,
                method: notification.method,
                data: data,
            },
            version: '1.1',
        }

        req.result.signature = sign(
            serialize(
                notification.method,
                notification.params.uuid,
                req.result.data
            ),
            this.privateKey
        )

        return req
    }

    verifyAndParseNotification = async (notification) => {
        await this.ready

        let lastNotification = null

        try {
            if (typeof notification === 'string') {
                try {
                    notification = JSON.parse(notification)
                } catch (error) {
                    throw new Error('Cant parse to JSON the notification.')
                }
            }

            lastNotification = notification

            let dataToVerify = serialize(
                notification.method,
                notification.params.uuid,
                notification.params.data
            )

            let v = verify(
                dataToVerify,
                notification.params.signature,
                this.publicKey
            )

            if (!v) {
                throw new Error('Cant verify the response.')
            }

            return notification
        } catch (err) {
            throw {
                error: err,
                lastNotification: lastNotification,
            }
        }
    }

    createNotificationResponse = async (
        notification,
        status: 'OK' | 'FAILED' = 'OK'
    ) => {
        await this.ready

        try {
            let parsedNotification =
                await this.verifyAndParseNotification(notification)

            return this.composeNotificationResponse(parsedNotification, {
                status,
            })
        } catch (err) {
            throw err
        }
    }

    _makeRequest = async (reqParams) => {
        this._lastRequest = reqParams
        this._lastResponse = null

        const fetchImpl: FetchLike =
            this.fetchImpl || (globalThis.fetch as FetchLike)

        if (!fetchImpl) {
            throw new Error(
                'clientError: No fetch implementation available. Use Node.js >= 20 or pass one via config.fetch.'
            )
        }

        try {
            const response = await fetchImpl(this.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify(reqParams),
                signal: AbortSignal.timeout(this.timeout),
                ...this.fetchOptions,
            })

            let data
            try {
                data = await response.json()
            } catch (error) {
                throw `Cant parse the response, check the lastResponse. HTTP status: ${response.status}`
            }

            this._lastResponse = data

            if (data.result) {
                this._verifyResponse(data.result)
                return data.result.data
            }

            if (data.error) {
                return parseError(data, this._lastRequest, this._lastResponse)
            }

            throw 'Cant parse the response, check the lastResponse.'
        } catch (error) {
            parseError(error, this._lastRequest, this._lastResponse)
        }
    }

    deposit = (data, attributes?) =>
        this._createMethod(deposit.method)(data, attributes)
    refund = (data, attributes?) =>
        this._createMethod(refund.method)(data, attributes)
    selectAccount = (data, attributes?) =>
        this._createMethod(selectAccount.method)(data, attributes)
    charge = (data, attributes?) =>
        this._createMethod(charge.method)(data, attributes)
    withdraw = (data, attributes?) =>
        this._createMethod(withdraw.method)(data, attributes)
    approveWithdrawal = (data, attributes?) =>
        this._createMethod(approveWithdrawal.method)(data, attributes)
    denyWithdrawal = (data, attributes?) =>
        this._createMethod(denyWithdrawal.method)(data, attributes)
    accountPayout = (data, attributes?) =>
        this._createMethod(accountPayout.method)(data, attributes)
    balance = (data, attributes?) =>
        this._createMethod(balance.method)(data, attributes)
    request = (method, params, attributes?) =>
        this._createMethod(method)(params, attributes)

    private _init = async (): Promise<void> => {
        if (this.publicKeyPath) {
            try {
                this.publicKey = await readFile(this.publicKeyPath)
            } catch (err) {
                throw `Error reading publickey. ${err}`
            }
        }

        if (this.privateKeyPath) {
            try {
                this.privateKey = await readFile(this.privateKeyPath)
            } catch (err) {
                throw `Error reading privateKey. ${err}`
            }
        }
    }
}
