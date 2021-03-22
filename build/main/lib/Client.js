"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const uuid_1 = require("uuid");
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
            let data = trustlySerializeData_1.serialize(res.method, res.uuid, res.data);
            let v = utils_1.verify(data, res.signature, this.publicKey);
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
            req.result.signature = utils_1.sign(trustlySerializeData_1.serialize(notification.method, notification.params.uuid, req.result.data), this.privateKey);
            return req;
        };
        this.createNotificationResponse = (notification, status = 'OK') => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                let dataToVerify = trustlySerializeData_1.serialize(notification.method, notification.params.uuid, notification.params.data);
                let v = utils_1.verify(dataToVerify, notification.params.signature, this.publicKey);
                if (!v) {
                    throw new Error('Cant verify the response.');
                }
                return this._prepareNotificationResponse(notification, status);
            }
            catch (err) {
                throw {
                    error: err,
                    lastNotification: lastNotification,
                };
            }
        });
        this._makeRequest = (reqParams) => {
            this._lastRequest = reqParams;
            this._lastResponse = null;
            return axios_1.default(Object.assign({ method: 'post', url: this.endpoint, headers: { 'Content-Type': 'application/json; charset=utf-8' }, data: reqParams, timeout: 2000 }, this.axiosRequestConfig))
                .then(({ data }) => {
                this._lastResponse = data;
                if (data.result) {
                    this._verifyResponse(data.result);
                    return data.result.data;
                }
                if (data.error) {
                    return utils_1.parseError(data, this._lastRequest, this._lastResponse);
                }
                throw 'Cant parse the response, check the lastResponse.';
            })
                .catch((error) => {
                utils_1.parseError(error, this._lastRequest, this._lastResponse);
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
                this.publicKey = yield utils_1.readFile(this.publicKeyPath);
            }
            catch (err) {
                throw `Error reading publickey. ${err}`;
            }
            if (this.privateKeyPath) {
                try {
                    this.privateKey = yield utils_1.readFile(this.privateKeyPath);
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
                ? utils_1.root('keys', 'trustly.com.public.pem')
                : utils_1.root('keys', 'test.trustly.com.public.pem');
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
        let UUID = uuid_1.v4();
        let Data = Object.assign({}, data, {
            Attributes: attributes ? attributes : null,
            Username: this.username,
            Password: this.password,
        });
        req.params = {
            Data: Data,
            UUID: UUID,
            Signature: utils_1.sign(trustlySerializeData_1.serialize(method, UUID, Data), this.privateKey),
        };
        return req;
    }
}
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlEO0FBQ2pELCtCQUFtQztBQUVuQyxvQ0FVaUI7QUFDakIsaUVBQWtEO0FBQ2xELG1DQUFrRTtBQUVsRSxNQUFhLE1BQU07SUFtQmYsWUFBWSxNQUF1QjtRQWxCbkMsYUFBUSxHQUFXLGdDQUFnQyxDQUFBO1FBQ25ELGdCQUFXLEdBQWdELGFBQWEsQ0FBQTtRQUN4RSxhQUFRLEdBQVcsRUFBRSxDQUFBO1FBQ3JCLGFBQVEsR0FBVyxFQUFFLENBQUE7UUFtRGQsa0JBQWEsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBTyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDNUQsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQ2hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUMxRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDakMsQ0FBQyxDQUFBLENBQUE7UUEwQkQsb0JBQWUsR0FBRyxVQUFVLEdBQUc7WUFDM0IsSUFBSSxJQUFJLEdBQUcsZ0NBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3BELElBQUksQ0FBQyxHQUFHLGNBQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDbkQsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUE7YUFDNUQ7UUFDTCxDQUFDLENBQUE7UUFFRCxpQ0FBNEIsR0FBRyxVQUMzQixZQUFZLEVBQ1os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