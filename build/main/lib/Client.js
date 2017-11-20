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
        this.init = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            this.keysLoaded = true;
            return this;
        });
        this._createMethod = (specs) => (params) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
    _makeRequest(reqParams) {
        this._lastRequest = reqParams;
        this._lastResponse = null;
        let parseErr = function (err) {
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
                parseErr(data);
            }
            parseErr('clientError: Cant parse the response, check the lastResponse.');
        })
            .catch((error) => {
            parseErr(`clientError: ${error}`);
        });
    }
    deposit(data) {
        return this._createMethod(constants_1.deposit)(data);
    }
    refund(data) {
        return this._createMethod(constants_1.refund)(data);
    }
    selectAccount(data) {
        return this._createMethod(constants_1.selectAccount)(data);
    }
    charge(data) {
        return this._createMethod(constants_1.charge)(data);
    }
    withdraw(data) {
        return this._createMethod(constants_1.withdraw)(data);
    }
    approveWithdrawal(data) {
        return this._createMethod(constants_1.approveWithdrawal)(data);
    }
    denyWithdrawal(data) {
        return this._createMethod(constants_1.denyWithdrawal)(data);
    }
}
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVqQyw0Q0FBa0g7QUFDbEgsbUNBQXNEO0FBQ3RELGlFQUFrRDtBQVlsRDtJQWdCSSxZQUFZLE1BQXVCO1FBZm5DLGFBQVEsR0FBVyxnQ0FBZ0MsQ0FBQTtRQUNuRCxnQkFBVyxHQUFnRCxhQUFhLENBQUE7UUFDeEUsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFBO1FBQ3JCLGVBQVUsR0FBWSxLQUFLLENBQUE7UUEwQzNCLFNBQUksR0FBRztZQUNILElBQUksQ0FBQztnQkFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sZ0JBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDdkQsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSw0QkFBNEIsR0FBRyxFQUFFLENBQUE7WUFDM0MsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLGdCQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO2dCQUN6RCxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsTUFBTSw2QkFBNkIsR0FBRyxFQUFFLENBQUE7Z0JBQzVDLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7WUFFdEIsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNmLENBQUMsQ0FBQSxDQUFBO1FBRU0sa0JBQWEsR0FB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