"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const uuidv4 = require('uuid/v4');
const constants_1 = require("../constants");
const utils_1 = require("./utils");
const trustlySerializeData_1 = require("./trustlySerializeData");
class Client {
    constructor(config) {
        this.endpoint = 'https://test.trustly.com/api/1';
        this.environment = 'development';
        this.username = '';
        this.password = '';
        this.keysLoaded = false;
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
        this._createMethod = (specs) => (params) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.ready;
            let data = {};
            let attributes = {};
            let dataFieldsArray = specs.dataFields;
            let attributesFieldsArray = specs.attributesFields;
            let requiredFields = specs.requiredFields;
            let keys = Object.keys(params);
            let requiredParams = 0;
            for (let i = 0; i < keys.length; i++) {
                let ky = keys[i];
                if (requiredFields.indexOf(ky) > -1) {
                    requiredParams++;
                }
                if (dataFieldsArray.indexOf(ky) > -1) {
                    data[ky] = params[ky];
                }
                if (attributesFieldsArray.indexOf(ky) > -1) {
                    attributes[ky] = params[ky];
                }
            }
            if (requiredParams < requiredFields.length) {
                throw new Error(`You dont send all required params. [${requiredFields.toString()}]`);
            }
            let req = this._prepareRequest(specs.method, data, attributes);
            return this._makeRequest(req);
        });
        this.verifyResponse = function (res) {
            let data = trustlySerializeData_1.serialize(res.method, res.uuid, res.data);
            let v = utils_1.verify(data, res.signature, this.publicKey);
            if (!v) {
                throw new Error('clientError: Cant verify the response.');
            }
        };
        this.prepareNotificationResponse = function (notification) {
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
        this._parseErr = (err) => {
            let error = {
                lastRequest: this._lastRequest,
                lastResponse: this._lastResponse,
                trustlyError: null,
                clientError: null
            };
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
                };
                error.trustlyError = tError;
            }
            else {
                error.clientError = err;
            }
            throw error;
        };
        this._makeRequest = (reqParams) => {
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
                    this.verifyResponse(data.result);
                    return data.result.data;
                }
                if (data.error) {
                    this._parseErr(data);
                }
                this._parseErr('clientError: Cant parse the response, check the lastResponse.');
            })
                .catch((error) => {
                this._parseErr(error);
            });
        };
        this.deposit = (data) => this._createMethod(constants_1.deposit)(data);
        this.refund = (data) => this._createMethod(constants_1.refund)(data);
        this.selectAccount = (data) => this._createMethod(constants_1.selectAccount)(data);
        this.charge = (data) => this._createMethod(constants_1.charge)(data);
        this.withdraw = (data) => this._createMethod(constants_1.withdraw)(data);
        this.approveWithdrawal = (data) => this._createMethod(constants_1.approveWithdrawal)(data);
        this.denyWithdrawal = (data) => this._createMethod(constants_1.denyWithdrawal)(data);
        let isProd = config.environment && ['production', 'prod', 'p'].indexOf(config.environment) > -1;
        this.publicKeyPath = config.publicKeyPath
            ? config.publicKeyPath
            : isProd
                ? utils_1.root('keys', 'trustly.com.public.pem')
                : utils_1.root('keys', 'test.trustly.com.public.pem');
        this.endpoint = isProd ? 'https://trustly.com/api/1' : 'https://test.trustly.com/api/1';
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
            Attributes: (attributes)
                ? attributes
                : null,
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
    createNotificationResponse(notification, callback) {
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
            return this.prepareNotificationResponse(notification);
        }
        catch (err) {
            throw {
                error: err,
                lastNotification: lastNotification
            };
        }
    }
}
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVqQyw0Q0FBa0g7QUFDbEgsbUNBQXNEO0FBQ3RELGlFQUFrRDtBQVlsRDtJQWtCSSxZQUFhLE1BQXVCO1FBakJwQyxhQUFRLEdBQVcsZ0NBQWdDLENBQUE7UUFDbkQsZ0JBQVcsR0FBZ0QsYUFBYSxDQUFBO1FBQ3hFLGFBQVEsR0FBVyxFQUFFLENBQUE7UUFDckIsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQUNyQixlQUFVLEdBQVksS0FBSyxDQUFBO1FBOEMzQixVQUFLLEdBQUc7WUFDSixJQUFJLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLGdCQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ3ZELENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sNEJBQTRCLEdBQUcsRUFBRSxDQUFBO1lBQzNDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDO29CQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxnQkFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFDekQsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNYLE1BQU0sNkJBQTZCLEdBQUcsRUFBRSxDQUFBO2dCQUM1QyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFBO1FBRU0sa0JBQWEsR0FBRyxDQUFDLEtBQUssS0FDekIsQ0FBTyxNQUFNO1lBRVQsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFBO1lB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