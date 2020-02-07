import { ConfigInterface } from './Interfaces';
import { Client } from './lib/Client';
export declare const TrustlyClient: typeof Client;
export declare const constants: {
    deposit: import("./Interfaces").MethodInterface;
    refund: import("./Interfaces").MethodInterface;
    selectAccount: import("./Interfaces").MethodInterface;
    withdraw: import("./Interfaces").MethodInterface;
    approveWithdrawal: import("./Interfaces").MethodInterface;
    denyWithdrawal: import("./Interfaces").MethodInterface;
    charge: import("./Interfaces").MethodInterface;
};
export declare const utils: {
    root: (...args: any[]) => string;
    readFile: (path: string) => Promise<string>;
};
export declare const helpers: {
    serialize: (method: any, uuid: any, data: any) => any;
    trustlySerializeData: (data: any, method?: any, uuid?: any) => any;
    sign: (data: any, key: any) => string;
    verify: (data: any, signature: any, key: any) => boolean;
};
export declare const client: (config: ConfigInterface) => Client;
export default client;
