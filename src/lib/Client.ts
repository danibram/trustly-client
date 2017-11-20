import axios from 'axios'
const uuidv4 = require('uuid/v4')

import { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge } from '../constants'
import { root, readFile, sign, verify } from './utils'
import { serialize } from './trustlySerializeData'

export type ConfigInterface = {
    username: string
    password: string
    privateKeyPath?: string
    privateKey?: string
    environment?: string
    endpoint?: string
    publicKeyPath?: string
}

export class Client {
    endpoint: string = 'https://test.trustly.com/api/1'
    environment: 'development' | 'production' | 'prod' | 'p' = 'development'
    username: string = ''
    password: string = ''
    keysLoaded: boolean = false

    privateKeyPath: string | undefined
    publicKeyPath: string

    privateKey: string | undefined
    publicKey: string

    _lastRequest: any
    _lastResponse: any

    constructor(config: ConfigInterface) {

        let isProd = config.environment && ['production', 'prod', 'p'].indexOf(config.environment) > -1

        this.publicKeyPath = config.publicKeyPath
            ? config.publicKeyPath
            : isProd
                ? root('keys', 'trustly.com.public.pem')
                : root('keys', 'test.trustly.com.public.pem')

        this.endpoint = isProd ? 'https://trustly.com/api/1' : 'https://test.trustly.com/api/1'
        this.environment = isProd ? 'production' : 'development'

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
    }

    init = async (): Promise<Client> => {
        try {
            this.publicKey = await readFile(this.publicKeyPath)
        } catch (err) {
            throw `Error reading publickey. ${err}`
        }

        if (this.privateKeyPath) {
            try {
                this.privateKey = await readFile(this.privateKeyPath)
            } catch (err) {
                throw `Error reading privateKey. ${err}`
            }
        }

        this.keysLoaded = true

        return this
    }

    public _createMethod = (specs) =>
        async (params) => {
            let data = {}
            let attributes = {}
            let dataFieldsArray = specs.dataFields
            let attributesFieldsArray = specs.attributesFields
            let requiredFields = specs.requiredFields

            let keys = Object.keys(params)
            let requiredParams = 0

            for (let i = 0; i < keys.length; i++) {
                let ky = keys[i]

                if (requiredFields.indexOf(ky) > -1) {
                    requiredParams++
                }
                if (dataFieldsArray.indexOf(ky) > -1) {
                    data[ky] = params[ky]
                }
                if (attributesFieldsArray.indexOf(ky) > -1) {
                    attributes[ky] = params[ky]
                }
            }

            if (requiredParams < requiredFields.length) {
                throw new Error(`You dont send all required params. [${requiredFields.toString()}]`)
            }

            let req = this._prepareRequest(specs.method, data, attributes)

            return this._makeRequest(req)
        }

    _prepareRequest (method, data= {}, attributes?) {
        let req = {
            method,
            params: {},
            version: '1.1'
        }

        let UUID = uuidv4()

        let Data = Object.assign(
            {},
            data,
            {
                Attributes: (attributes)
                    ? attributes
                    : null,
                Username: this.username,
                Password: this.password
            }
        )

        req.params = {
            Data: Data,
            UUID: UUID,
            Signature: sign(
                serialize(method, UUID, Data),
                this.privateKey
            )
        }

        return req
    }

    verifyResponse = function(res) {
        let data = serialize(res.method, res.uuid, res.data)
        let v = verify(data, res.signature, this.publicKey)
        if (!v) {
            throw new Error('clientError: Cant verify the response.')
        }
    }

    prepareNotificationResponse = function(notification) {
        let req = {
            result: {
                signature: '',
                uuid: notification.params.uuid,
                method: notification.method,
                data: {
                    status: 'OK'
                }
            },
            version: '1.1'
        }

        req.result.signature = sign(
            serialize(notification.method, notification.params.uuid, req.result.data),
            this.privateKey
        )

        return req
    }

    createNotificationResponse(notification, callback) {
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

            return this.prepareNotificationResponse(notification)

        } catch (err) {
            throw {
                error: err,
                lastNotification: lastNotification
            }
        }
    }

    _makeRequest (reqParams) {
        this._lastRequest = reqParams
        this._lastResponse = null

        let parseErr = function(err) {
            let error = {
                lastRequest: this._lastRequest,
                lastResponse: this._lastResponse,
                trustlyError: null,
                clientError: null
            }
            if (err && err.error) {
                let tError = {
                    method: (err.error.error.method)
                        ? err.error.error.method
                        : null,
                    uuid: err.error.error.uuid
                        ? err.error.error.uuid
                        : null,
                    message: err.error.message
                        ? err.error.message
                        : null,
                    code: err.error.code ? err.error.code : null
                }

                error.trustlyError = tError as any
            } else {
                error.clientError = err
            }

            throw error
        }

        return axios({
            method: 'post',
            url: this.endpoint,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            data: reqParams,
            timeout: 2000
        })
            .then(({ data }) => {
                this._lastResponse = data

                if (data.result) {
                    this.verifyResponse(data.result)
                    return data.result.data
                }
                if (data.error) {
                    parseErr(data)
                }
                parseErr('clientError: Cant parse the response, check the lastResponse.')
            })
            .catch((error) => {
                parseErr(`clientError: ${error}`)
            })
    }

    deposit(data) {
        return this._createMethod(deposit)(data)
    }
    refund(data) {
        return this._createMethod(refund)(data)
    }
    selectAccount(data) {
        return this._createMethod(selectAccount)(data)
    }
    charge(data) {
        return this._createMethod(charge)(data)
    }
    withdraw(data) {
        return this._createMethod(withdraw)(data)
    }
    approveWithdrawal(data) {
        return this._createMethod(approveWithdrawal)(data)
    }
    denyWithdrawal(data) {
        return this._createMethod(denyWithdrawal)(data)
    }
}
