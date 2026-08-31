"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const crypto_1 = require("crypto");
const specs_1 = require("../specs");
const trustlySerializeData_1 = require("./trustlySerializeData");
const utils_1 = require("./utils");
class Client {
    constructor(config) {
        this.endpoint = 'https://test.trustly.com/api/1';
        this.environment = 'development';
        this.username = '';
        this.password = '';
        this._createMethod = (method) => (params, attributes) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.ready;
            let req = this._prepareRequest(method, params, attributes);
            return this._makeRequest(req);
        });
        this._verifyResponse = function (res) {
            let data = (0, trustlySerializeData_1.serialize)(res.method, res.uuid, res.data);
            let v = (0, utils_1.verify)(data, res.signature, this.publicKey);
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
            req.result.signature = (0, utils_1.sign)((0, trustlySerializeData_1.serialize)(notification.method, notification.params.uuid, req.result.data), this.privateKey);
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
            req.result.signature = (0, utils_1.sign)((0, trustlySerializeData_1.serialize)(notification.method, notification.params.uuid, req.result.data), this.privateKey);
            return req;
        };
        this.verifyAndParseNotification = (notification) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                let dataToVerify = (0, trustlySerializeData_1.serialize)(notification.method, notification.params.uuid, notification.params.data);
                let v = (0, utils_1.verify)(dataToVerify, notification.params.signature, this.publicKey);
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
        this.createNotificationResponse = (notification_1, ...args_1) => tslib_1.__awaiter(this, [notification_1, ...args_1], void 0, function* (notification, status = 'OK') {
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
            return (0, axios_1.default)(Object.assign({ method: 'post', url: this.endpoint, headers: { 'Content-Type': 'application/json; charset=utf-8' }, data: reqParams, timeout: 2000 }, this.axiosRequestConfig))
                .then(({ data }) => {
                this._lastResponse = data;
                if (data.result) {
                    this._verifyResponse(data.result);
                    return data.result.data;
                }
                if (data.error) {
                    return (0, utils_1.parseError)(data, this._lastRequest, this._lastResponse);
                }
                throw 'Cant parse the response, check the lastResponse.';
            })
                .catch((error) => {
                (0, utils_1.parseError)(error, this._lastRequest, this._lastResponse);
            });
        };
        this.deposit = (data, attributes) => this._createMethod(specs_1.deposit.method)(data, attributes);
        this.refund = (data, attributes) => this._createMethod(specs_1.refund.method)(data, attributes);
        this.selectAccount = (data, attributes) => this._createMethod(specs_1.selectAccount.method)(data, attributes);
        this.charge = (data, attributes) => this._createMethod(specs_1.charge.method)(data, attributes);
        this.withdraw = (data, attributes) => this._createMethod(specs_1.withdraw.method)(data, attributes);
        this.approveWithdrawal = (data, attributes) => this._createMethod(specs_1.approveWithdrawal.method)(data, attributes);
        this.denyWithdrawal = (data, attributes) => this._createMethod(specs_1.denyWithdrawal.method)(data, attributes);
        this.accountPayout = (data, attributes) => this._createMethod(specs_1.accountPayout.method)(data, attributes);
        this.balance = (data, attributes) => this._createMethod(specs_1.balance.method)(data, attributes);
        this.request = (method, params, attributes) => this._createMethod(method)(params, attributes);
        this._init = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.publicKey = yield (0, utils_1.readFile)(this.publicKeyPath);
            }
            catch (err) {
                throw `Error reading publickey. ${err}`;
            }
            if (this.privateKeyPath) {
                try {
                    this.privateKey = yield (0, utils_1.readFile)(this.privateKeyPath);
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
                ? (0, utils_1.root)('keys', 'trustly.com.public.pem')
                : (0, utils_1.root)('keys', 'test.trustly.com.public.pem');
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
        let UUID = (0, crypto_1.randomUUID)();
        let Data = Object.assign({}, data, {
            Attributes: attributes ? attributes : null,
            Username: this.username,
            Password: this.password,
        });
        req.params = {
            Data: Data,
            UUID: UUID,
            Signature: (0, utils_1.sign)((0, trustlySerializeData_1.serialize)(method, UUID, Data), this.privateKey),
        };
        return req;
    }
}
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGlDQUFpRDtBQUNqRCxtQ0FBbUM7QUFFbkMsb0NBVWlCO0FBQ2pCLGlFQUFrRDtBQUNsRCxtQ0FBa0U7QUFFbEUsTUFBYSxNQUFNO0lBbUJmLFlBQVksTUFBdUI7UUFsQm5DLGFBQVEsR0FBVyxnQ0FBZ0MsQ0FBQTtRQUNuRCxnQkFBVyxHQUFnRCxhQUFhLENBQUE7UUFDeEUsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFBO1FBbURkLGtCQUFhLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQU8sTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQzVELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQTtZQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDMUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQSxDQUFBO1FBMEJELG9CQUFlLEdBQUcsVUFBVSxHQUFHO1lBQzNCLElBQUksSUFBSSxHQUFHLElBQUEsZ0NBQVMsRUFBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3BELElBQUksQ0FBQyxHQUFHLElBQUEsY0FBTSxFQUFDLElBQUksRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNuRCxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO1lBQzdELENBQUM7UUFDTCxDQUFDLENBQUE7UUFFRCxpQ0FBNEIs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