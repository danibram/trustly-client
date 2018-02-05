export declare type MethodInterface = {
    method: string;
    dataFields: string[];
    attributesFields: string[];
    requiredFields: string[];
};
export declare type ConfigInterface = {
    username: string;
    password: string;
    privateKeyPath?: string;
    privateKey?: string;
    environment?: string;
    endpoint?: string;
    publicKeyPath?: string;
    specs?: {
        [key: string]: MethodInterface;
    };
};
