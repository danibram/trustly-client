"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const uuidv4 = require('uuid/v4');
const specs_1 = require("../specs");
const utils_1 = require("./utils");
const trustlySerializeData_1 = require("./trustlySerializeData");
class Client {
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
            let data = trustlySerializeData_1.serialize(res.method, res.uuid, res.data);
            let v = utils_1.verify(data, res.signature, this.publicKey);
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
            req.result.signature = utils_1.sign(trustlySerializeData_1.serialize(notification.method, notification.params.uuid, req.result.data), this.privateKey);
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
                let dataToVerify = trustlySerializeData_1.serialize(notification.method, notification.params.uuid, notification.params.data);
                let v = utils_1.verify(dataToVerify, notification.params.signature, this.publicKey);
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
            return axios_1.default({
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
                    return utils_1.parseError(data, this._lastRequest, this._lastResponse);
                }
                throw 'Cant parse the response, check the lastResponse.';
            })
                .catch(error => {
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
            Signature: utils_1.sign(trustlySerializeData_1.serialize(method, UUID, Data), this.privateKey)
        };
        return req;
    }
}
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVqQyxvQ0FVaUI7QUFDakIsbUNBQWtFO0FBQ2xFLGlFQUFrRDtBQUdsRDtJQWlCSSxZQUFZLE1BQXVCO1FBaEJuQyxhQUFRLEdBQVcsZ0NBQWdDLENBQUE7UUFDbkQsZ0JBQVcsR0FBZ0QsYUFBYSxDQUFBO1FBQ3hFLGFBQVEsR0FBVyxFQUFFLENBQUE7UUFDckIsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQWlEZCxrQkFBYSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBTyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDMUQsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQ2hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUEsQ0FBQTtRQTBCRCxvQkFBZSxHQUFHLFVBQVUsR0FBRztZQUMzQixJQUFJLElBQUksR0FBRyxnQ0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEQsSUFBSSxDQUFDLEdBQUcsY0FBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO1lBQzdELENBQUM7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