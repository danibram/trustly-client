import { AxiosRequestConfig } from 'axios';
import { ConfigInterface } from '../Interfaces';
export declare class Client {
    endpoint: string;
    environment: 'development' | 'production' | 'prod' | 'p';
    username: string;
    password: string;
    axiosRequestConfig: AxiosRequestConfig | {};
    privateKeyPath: string | undefined;
    publicKeyPath: string;
    privateKey: string | undefined;
    publicKey: string;
    _lastRequest: any;
    _lastResponse: any;
    ready: Promise<any>;
    constructor(config: ConfigInterface);
    _createMethod: (method: any) => (params: any, attributes: any) => Promise<any>;
    _prepareRequest(method: any, data?: {}, attributes?: any): {
        method: any;
        params: {};
        version: string;
    };
    _verifyResponse: (res: any) => void;
    _prepareNotificationResponse: (notification: any, status?: "OK" | "FAILED", additionalData?: {}) => {
        result: {
            signature: string;
            uuid: any;
            method: any;
            data: {
                status: "OK" | "FAILED";
            };
        };
        version: string;
    };
    composeNotificationResponse: (notification: any, data?: {}) => {
        result: {
            signature: string;
            uuid: any;
            method: any;
            data: {};
        };
        version: string;
    };
    verifyAndParseNotification: (notification: any) => Promise<any>;
    createNotificationResponse: (notification: any, status?: "OK" | "FAILED") => Promise<{
        result: {
            signature: string;
            uuid: any;
            method: any;
            data: {};
        };
        version: string;
    }>;
    _makeRequest: (reqParams: any) => Promise<any>;
    deposit: (data: any, attributes?: any) => Promise<any>;
    refund: (data: any, attributes?: any) => Promise<any>;
    selectAccount: (data: any, attributes?: any) => Promise<any>;
    charge: (data: any, attributes?: any) => Promise<any>;
    withdraw: (data: any, attributes?: any) => Promise<any>;
    approveWithdrawal: (data: any, attributes?: any) => Promise<any>;
    denyWithdrawal: (data: any, attributes?: any) => Promise<any>;
    accountPayout: (data: any, attributes?: any) => Promise<any>;
    balance: (data: any, attributes?: any) => Promise<any>;
    request: (method: any, params: any, attributes?: any) => Promise<any>;
    private _init;
}
