import * as tslib_1 from "tslib";
import axios from 'axios';
const uuidv4 = require('uuid/v4');
import { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge, accountPayout } from '../specs';
import { root, readFile, sign, verify, parseError } from './utils';
import { serialize } from './trustlySerializeData';
export class Client {
    constructor(config) {
        this.endpoint = 'https://test.trustly.com/api/1';
        this.environment = 'development';
        this.username = '';
        this.password = '';
        this._createMethod = method => (params, attributes) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.ready;
            let req = this._prepareRequest(method, params, attributes);
            return this._makeRequest(req);
        });
        this._verifyResponse = function (res) {
            let data = serialize(res.method, res.uuid, res.data);
            let v = verify(data, res.signature, this.publicKey);
            if (!v) {
                throw new Error('clientError: Cant verify the response.');
            }
        };
        this._prepareNotificationResponse = function (notification) {
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
            };
            req.result.signature = sign(serialize(notification.method, notification.params.uuid, req.result.data), this.privateKey);
            return req;
        };
        this.createNotificationResponse = (notification, callback) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.ready;
            let lastNotification = null;
            try {
                if (typeof notification === 'string') {
                    try {
                        notification = JSON.parse(notification);
                    }
                    catch (error) {
                        throw new Error('Cant parse to JSON the notification.');
                    }
                }
                lastNotification = notification;
                let dataToVerify = serialize(notification.method, notification.params.uuid, notification.params.data);
                let v = verify(dataToVerify, notification.params.signature, this.publicKey);
                if (!v) {
                    throw new Error('Cant verify the response.');
                }
                return this._prepareNotificationResponse(notification);
            }
            catch (err) {
                throw {
                    error: err,
                    lastNotification: lastNotification
                };
            }
        });
        this._makeRequest = reqParams => {
            this._lastRequest = reqParams;
            this._lastResponse = null;
            return axios({
                method: 'post',
                url: this.endpoint,
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                data: reqParams,
                timeout: 2000
            })
                .then(({ data }) => {
                this._lastResponse = data;
                if (data.result) {
                    this._verifyResponse(data.result);
                    return data.result.data;
                }
                if (data.error) {
                    return parseError(data, this._lastRequest, this._lastResponse);
                }
                throw 'Cant parse the response, check the lastResponse.';
            })
                .catch(error => {
                parseError(error, this._lastRequest, this._lastResponse);
            });
        };
        this.deposit = (data, attributes) => this._createMethod(deposit.method)(data, attributes);
        this.refund = (data, attributes) => this._createMethod(refund.method)(data, attributes);
        this.selectAccount = (data, attributes) => this._createMethod(selectAccount.method)(data, attributes);
        this.charge = (data, attributes) => this._createMethod(charge.method)(data, attributes);
        this.withdraw = (data, attributes) => this._createMethod(withdraw.method)(data, attributes);
        this.approveWithdrawal = (data, attributes) => this._createMethod(approveWithdrawal.method)(data, attributes);
        this.denyWithdrawal = (data, attributes) => this._createMethod(denyWithdrawal.method)(data, attributes);
        this.accountPayout = (data, attributes) => this._createMethod(accountPayout.method)(data, attributes);
        this.request = (method, params, attributes) => this._createMethod(method)(params, attributes);
        this._init = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.publicKey = yield readFile(this.publicKeyPath);
            }
            catch (err) {
                throw `Error reading publickey. ${err}`;
            }
            if (this.privateKeyPath) {
                try {
                    this.privateKey = yield readFile(this.privateKeyPath);
                }
                catch (err) {
                    throw `Error reading privateKey. ${err}`;
                }
            }
        });
        let isProd = config.environment &&
            ['production', 'prod', 'p'].indexOf(config.environment) > -1;
        this.publicKeyPath = config.publicKeyPath
            ? config.publicKeyPath
            : isProd
                ? root('keys', 'trustly.com.public.pem')
                : root('keys', 'test.trustly.com.public.pem');
        this.endpoint = isProd
            ? 'https://trustly.com/api/1'
            : 'https://test.trustly.com/api/1';
        this.environment = isProd ? 'production' : 'development';
        if (!config.username) {
            throw `No username provided, please provide one.`;
        }
        if (!config.password) {
            throw `No password provided, please provide one.`;
        }
        if (!config.privateKeyPath && !config.privateKey) {
            throw `No privateKeyPath or privateKey provided, please provide one.`;
        }
        this.username = config.username;
        this.password = config.password;
        this.privateKeyPath = config.privateKeyPath;
        this.privateKey = config.privateKey;
        this.ready = this._init();
    }
    _prepareRequest(method, data = {}, attributes) {
        let req = {
            method,
            params: {},
            version: '1.1'
        };
        let UUID = uuidv4();
        let Data = Object.assign({}, data, {
            Attributes: attributes ? attributes : null,
            Username: this.username,
            Password: this.password
        });
        req.params = {
            Data: Data,
            UUID: UUID,
            Signature: sign(serialize(method, UUID, Data), this.privateKey)
        };
        return req;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUN6QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7QUFFakMsT0FBTyxFQUNILE9BQU8sRUFDUCxNQUFNLEVBQ04sYUFBYSxFQUNiLFFBQVEsRUFDUixpQkFBaUIsRUFDakIsY0FBYyxFQUNkLE1BQU0sRUFDTixhQUFhLEVBQ2hCLE1BQU0sVUFBVSxDQUFBO0FBQ2pCLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUdsRCxNQUFNO0lBaUJGLFlBQVksTUFBdUI7UUFoQm5DLGFBQVEsR0FBVyxnQ0FBZ0MsQ0FBQTtRQUNuRCxnQkFBVyxHQUFnRCxhQUFhLENBQUE7UUFDeEUsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFBO1FBaURkLGtCQUFhLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFPLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUMxRCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUE7WUFDaEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQSxDQUFBO1FBMEJELG9CQUFlLEdBQUcsVUFBVSxHQUFHO1lBQzNCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJ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