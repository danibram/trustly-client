export declare type ConfigInterface = {
    username: string;
    password: string;
    privateKeyPath?: string;
    privateKey?: string;
    environment?: string;
    endpoint?: string;
    publicKeyPath?: string;
};
export declare const parseError: (err: any, lastRequest: any, lastResponse: any) => never;
export declare class Client {
    endpoint: string;
    environment: 'development' | 'production' | 'prod' | 'p';
    username: string;
    password: string;
    privateKeyPath: string | undefined;
    publicKeyPath: string;
    privateKey: string | undefined;
    publicKey: string;
    _lastRequest: any;
    _lastResponse: any;
    ready: Promise<any>;
    constructor(config: ConfigInterface);
    _createMethod: (specs: any) => (params: any) => Promise<any>;
    _prepareRequest(method: any, data?: {}, attributes?: any): {
        method: any;
        params: {};
        version: string;
    };
    _verifyResponse: (res: any) => void;
    _prepareNotificationResponse: (notification: any) => {
        result: {
            signature: string;
            uuid: any;
            method: any;
            data: {
                status: string;
            };
        };
        version: string;
    };
    createNotificationResponse: (notification: any, callback: any) => Promise<{
        result: {
            signature: string;
            uuid: any;
            method: any;
            data: {
                status: string;
            };
        };
        version: string;
    }>;
    _makeRequest: (reqParams: any) => Promise<any>;
    deposit: (data: any) => Promise<any>;
    refund: (data: any) => Promise<any>;
    selectAccount: (data: any) => Promise<any>;
    charge: (data: any) => Promise<any>;
    withdraw: (data: any) => Promise<any>;
    approveWithdrawal: (data: any) => Promise<any>;
    denyWithdrawal: (data: any) => Promise<any>;
    private _init;
}
