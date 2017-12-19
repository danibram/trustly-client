export declare type MethodInterface = {
    method: string;
    dataFields: string[];
    attributesFields: string[];
    requiredFields: string[];
};
export declare const deposit: MethodInterface;
export declare const refund: MethodInterface;
export declare const accountPayout: MethodInterface;
export declare const selectAccount: MethodInterface;
export declare const charge: MethodInterface;
export declare const withdraw: MethodInterface;
export declare const approveWithdrawal: MethodInterface;
export declare const denyWithdrawal: MethodInterface;
