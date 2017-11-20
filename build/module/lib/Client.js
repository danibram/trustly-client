import * as tslib_1 from "tslib";
import axios from 'axios';
const uuidv4 = require('uuid/v4');
import { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge } from '../constants';
import { root, readFile, sign, verify } from './utils';
import { serialize } from './trustlySerializeData';
export class Client {
    constructor(username, password, privateKeyPath, privateKey, environment, endpoint, publicKeyPath) {
        this.endpoint = 'https://test.trustly.com/api/1';
        this.environment = 'development';
        this.username = '';
        this.password = '';
        this.keysLoaded = false;
        this.init = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            let data = serialize(res.method, res.uuid, res.data);
            let v = verify(data, res.signature, this.publicKey);
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
            req.result.signature = sign(serialize(notification.method, notification.params.uuid, req.result.data), this.privateKey);
            return req;
        };
        let isProd = environment && ['production', 'prod', 'p'].indexOf(environment) > -1;
        this.publicKeyPath = publicKeyPath
            ? publicKeyPath
            : isProd
                ? root('keys', 'trustly.com.public.pem')
                : root('keys', 'test.trustly.com.public.pem');
        this.endpoint = isProd ? 'https://trustly.com/api/1' : 'https://test.trustly.com/api/1';
        this.environment = isProd ? 'production' : 'development';
        if (!username) {
            throw `No username provided, please provide one.`;
        }
        if (!password) {
            throw `No password provided, please provide one.`;
        }
        if (!privateKeyPath && !privateKey) {
            throw `No privateKeyPath or privateKey provided, please provide one.`;
        }
        this.username = username;
        this.password = password;
        this.privateKeyPath = privateKeyPath;
        this.privateKey = privateKey;
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
            Signature: sign(serialize(method, UUID, Data), this.privateKey)
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
            let dataToVerify = serialize(notification.method, notification.params.uuid, notification.params.data);
            let v = verify(dataToVerify, notification.params.signature, this.publicKey);
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
        return this._createMethod(deposit)(data);
    }
    refund(data) {
        return this._createMethod(refund)(data);
    }
    selectAccount(data) {
        return this._createMethod(selectAccount)(data);
    }
    charge(data) {
        return this._createMethod(charge)(data);
    }
    withdraw(data) {
        return this._createMethod(withdraw)(data);
    }
    approveWithdrawal(data) {
        return this._createMethod(approveWithdrawal)(data);
    }
    denyWithdrawal(data) {
        return this._createMethod(denyWithdrawal)(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUN6QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7QUFFakMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ2xILE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBRWxELE1BQU07SUFnQkYsWUFBWSxRQUFRLEVBQUUsUUFBUSxFQUFFLGNBQWUsRUFBRSxVQUFXLEVBQUUsV0FBWSxFQUFFLFFBQVMsRUFBRSxhQUFjO1FBZnJHLGFBQVEsR0FBVyxnQ0FBZ0MsQ0FBQTtRQUNuRCxnQkFBVyxHQUFnRCxhQUFhLENBQUE7UUFDeEUsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFBO1FBQ3JCLGVBQVUsR0FBWSxLQUFLLENBQUE7UUEwQzNCLFNBQUksR0FBRztZQUNILElBQUksQ0FBQztnQkFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUN2RCxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDWCxNQUFNLDRCQUE0QixHQUFHLEVBQUUsQ0FBQTtZQUMzQyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQztvQkFDRCxJQUFJLENB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