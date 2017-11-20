import { Client, ConfigInterface } from './lib/Client';
import { MethodInterface } from './constants';
export declare const TrustlyClient: typeof Client;
export declare const constants: {
    deposit: MethodInterface;
    refund: MethodInterface;
    selectAccount: MethodInterface;
    withdraw: MethodInterface;
    approveWithdrawal: MethodInterface;
    denyWithdrawal: MethodInterface;
    charge: MethodInterface;
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
export declare const client: (config: ConfigInterface) => Client;
export default client;
