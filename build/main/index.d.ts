import { Client, ConfigInterface } from './lib/Client';
export declare const TrustlyClient: typeof Client;
export declare const constants: {
    deposit: {
        method: string;
        dataFields: string[];
        attributesFields: string[];
        requiredFields: string[];
    };
    refund: {
        method: string;
        dataFields: string[];
        attributesFields: never[];
        requiredFields: string[];
    };
    selectAccount: {
        method: string;
        dataFields: string[];
        attributesFields: string[];
        requiredFields: string[];
    };
    withdraw: {
        method: string;
        dataFields: string[];
        attributesFields: string[];
        requiredFields: string[];
    };
    approveWithdrawal: {
        method: string;
        dataFields: string[];
        attributesFields: never[];
        requiredFields: string[];
    };
    denyWithdrawal: {
        method: string;
        dataFields: string[];
        attributesFields: never[];
        requiredFields: string[];
    };
    charge: {
        method: string;
        dataFields: string[];
        attributesFields: string[];
        requiredFields: string[];
    };
};
export declare const utils: {
    root: (...args: any[]) => string;
    readFile: (path: string) => Promise<string>;
};
export declare const helpers: {
    serialize: (method: any, uuid: any, data: any) => any;
    trustlySerializeData: (data: any) => any;
    sign: (data: any, key: any) => string;
    verify: (data: any, signature: any, key: any) => boolean;
};
declare const _default: (config: ConfigInterface) => Client;
export default _default;
