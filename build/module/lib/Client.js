import { __awaiter } from "tslib";
import axios from 'axios';
import { randomUUID } from 'crypto';
import { accountPayout, approveWithdrawal, balance, charge, denyWithdrawal, deposit, refund, selectAccount, withdraw, } from '../specs';
import { serialize } from './trustlySerializeData';
import { parseError, readFile, root, sign, verify } from './utils';
export class Client {
    constructor(config) {
        this.endpoint = 'https://test.trustly.com/api/1';
        this.environment = 'development';
        this.username = '';
        this.password = '';
        this._createMethod = (method) => (params, attributes) => __awaiter(this, void 0, void 0, function* () {
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
        this._prepareNotificationResponse = function (notification, status = 'OK') {
            let req = {
                result: {
                    signature: '',
                    uuid: notification.params.uuid,
                    method: notification.method,
                    data: { status },
                },
                version: '1.1',
            };
            req.result.signature = sign(serialize(notification.method, notification.params.uuid, req.result.data), this.privateKey);
            return req;
        };
        this.composeNotificationResponse = function (notification, data = {}) {
            let req = {
                result: {
                    signature: '',
                    uuid: notification.params.uuid,
                    method: notification.method,
                    data: data,
                },
                version: '1.1',
            };
            req.result.signature = sign(serialize(notification.method, notification.params.uuid, req.result.data), this.privateKey);
            return req;
        };
        this.verifyAndParseNotification = (notification) => __awaiter(this, void 0, void 0, function* () {
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
                return notification;
            }
            catch (err) {
                throw {
                    error: err,
                    lastNotification: lastNotification,
                };
            }
        });
        this.createNotificationResponse = (notification_1, ...args_1) => __awaiter(this, [notification_1, ...args_1], void 0, function* (notification, status = 'OK') {
            yield this.ready;
            try {
                let parsedNotification = yield this.verifyAndParseNotification(notification);
                return this.composeNotificationResponse(parsedNotification, {
                    status,
                });
            }
            catch (err) {
                throw err;
            }
        });
        this._makeRequest = (reqParams) => {
            this._lastRequest = reqParams;
            this._lastResponse = null;
            return axios(Object.assign({ method: 'post', url: this.endpoint, headers: { 'Content-Type': 'application/json; charset=utf-8' }, data: reqParams, timeout: 2000 }, this.axiosRequestConfig))
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
                .catch((error) => {
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
        this.balance = (data, attributes) => this._createMethod(balance.method)(data, attributes);
        this.request = (method, params, attributes) => this._createMethod(method)(params, attributes);
        this._init = () => __awaiter(this, void 0, void 0, function* () {
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
        this.axiosRequestConfig = config.axiosRequestConfig || {};
        this.ready = this._init();
    }
    _prepareRequest(method, data = {}, attributes) {
        let req = {
            method,
            params: {},
            version: '1.1',
        };
        let UUID = randomUUID();
        let Data = Object.assign({}, data, {
            Attributes: attributes ? attributes : null,
            Username: this.username,
            Password: this.password,
        });
        req.params = {
            Data: Data,
            UUID: UUID,
            Signature: sign(serialize(method, UUID, Data), this.privateKey),
        };
        return req;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBNkIsTUFBTSxPQUFPLENBQUE7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUVuQyxPQUFPLEVBQ0gsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixPQUFPLEVBQ1AsTUFBTSxFQUNOLGNBQWMsRUFDZCxPQUFPLEVBQ1AsTUFBTSxFQUNOLGFBQWEsRUFDYixRQUFRLEdBQ1gsTUFBTSxVQUFVLENBQUE7QUFDakIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRWxFLE1BQU0sT0FBTyxNQUFNO0lBbUJmLFlBQVksTUFBdUI7UUFsQm5DLGFBQVEsR0FBVyxnQ0FBZ0MsQ0FBQTtRQUNuRCxnQkFBVyxHQUFnRCxhQUFhLENBQUE7UUFDeEUsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFBO1FBbURkLGtCQUFhLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQU8sTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQzVELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQTtZQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDMUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQSxDQUFBO1FBMEJELG9CQUFlLEdBQUcsVUFBVSxHQUFHO1lBQzNCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxF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