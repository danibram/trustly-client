"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const uuidv4 = require('uuid/v4');
const constants_1 = require("../constants");
const utils_1 = require("./utils");
const trustlySerializeData_1 = require("./trustlySerializeData");
exports.parseError = (err, lastRequest, lastResponse) => {
    let error = {
        lastRequest: lastRequest,
        lastResponse: lastResponse,
        trustlyError: null,
        clientError: null
    };
    if (err && err.error) {
        let tError = {
            method: err.error.error.method ? err.error.error.method : null,
            uuid: err.error.error.uuid ? err.error.error.uuid : null,
            message: err.error.message ? err.error.message : null,
            code: err.error.code ? err.error.code : null
        };
        error.trustlyError = tError;
    }
    else {
        error.clientError = err;
    }
    throw error;
};
class Client {
    constructor(config) {
        this.endpoint = 'https://test.trustly.com/api/1';
        this.environment = 'development';
        this.username = '';
        this.password = '';
        this._createMethod = specs => (params) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                    return exports.parseError(data, this._lastRequest, this._lastResponse);
                }
                throw 'Cant parse the response, check the lastResponse.';
            })
                .catch(error => {
                exports.parseError(error, this._lastRequest, this._lastResponse);
            });
        };
        this.deposit = data => this._createMethod(constants_1.deposit)(data);
        this.refund = data => this._createMethod(constants_1.refund)(data);
        this.selectAccount = data => this._createMethod(constants_1.selectAccount)(data);
        this.charge = data => this._createMethod(constants_1.charge)(data);
        this.withdraw = data => this._createMethod(constants_1.withdraw)(data);
        this.approveWithdrawal = data => this._createMethod(constants_1.approveWithdrawal)(data);
        this.denyWithdrawal = data => this._createMethod(constants_1.denyWithdrawal)(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVqQyw0Q0FRcUI7QUFDckIsbUNBQXNEO0FBQ3RELGlFQUFrRDtBQVlyQyxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsWUFBWTtJQUNyRCxJQUFJLEtBQUssR0FBRztRQUNSLFdBQVcsRUFBRSxXQUFXO1FBQ3hCLFlBQVksRUFBRSxZQUFZO1FBQzFCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFdBQVcsRUFBRSxJQUFJO0tBQ3BCLENBQUE7SUFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxNQUFNLEdBQUc7WUFDVCxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJO1lBQzlELElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUk7WUFDeEQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUk7WUFDckQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUk7U0FDL0MsQ0FBQTtRQUVELEtBQUssQ0FBQyxZQUFZLEdBQUcsTUFBYSxDQUFBO0lBQ3RDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztR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