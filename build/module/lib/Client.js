import * as tslib_1 from "tslib";
import axios from 'axios';
const uuidv4 = require('uuid/v4');
import { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge } from '../constants';
import { root, readFile, sign, verify } from './utils';
import { serialize } from './trustlySerializeData';
export const parseError = (err, lastRequest, lastResponse) => {
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
export class Client {
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
        this.deposit = data => this._createMethod(deposit)(data);
        this.refund = data => this._createMethod(refund)(data);
        this.selectAccount = data => this._createMethod(selectAccount)(data);
        this.charge = data => this._createMethod(charge)(data);
        this.withdraw = data => this._createMethod(withdraw)(data);
        this.approveWithdrawal = data => this._createMethod(approveWithdrawal)(data);
        this.denyWithdrawal = data => this._createMethod(denyWithdrawal)(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUN6QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7QUFFakMsT0FBTyxFQUNILE9BQU8sRUFDUCxNQUFNLEVBQ04sYUFBYSxFQUNiLFFBQVEsRUFDUixpQkFBaUIsRUFDakIsY0FBYyxFQUNkLE1BQU0sRUFDVCxNQUFNLGNBQWMsQ0FBQTtBQUNyQixPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQVlsRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLFlBQVk7SUFDckQsSUFBSSxLQUFLLEdBQUc7UUFDUixXQUFXLEVBQUUsV0FBVztRQUN4QixZQUFZLEVBQUUsWUFBWTtRQUMxQixZQUFZLEVBQUUsSUFBSTtRQUNsQixXQUFXLEVBQUUsSUFBSTtLQUNwQixDQUFBO0lBRUQsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksTUFBTSxHQUFHO1lBQ1QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSTtZQUM5RCxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJO1lBQ3hELE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFD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