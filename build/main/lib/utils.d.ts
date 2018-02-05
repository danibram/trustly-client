export declare const readFile: (path: string) => Promise<string>;
export declare const root: (...args: any[]) => string;
export declare const sign: (data: any, key: any) => string;
export declare const verify: (data: any, signature: any, key: any) => boolean;
export declare const parseError: (err: any, lastRequest: any, lastResponse: any) => never;
