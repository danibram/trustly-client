"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balance = exports.denyWithdrawal = exports.approveWithdrawal = exports.withdraw = exports.charge = exports.selectAccount = exports.accountPayout = exports.refund = exports.deposit = void 0;
exports.deposit = {
    method: 'Deposit',
    dataFields: ['NotificationURL', 'EndUserID', 'MessageID'],
    attributesFields: [
        'Currency',
        'Firstname',
        'Lastname',
        'Email',
        'Locale',
        'SuggestedMinAmount',
        'SuggestedMaxAmount',
        'Amount',
        'Country',
        'IP',
        'SuccessURL',
        'FailURL',
        'TemplateURL',
        'URLTarget',
        'MobilePhone',
        'NationalIdentificationNumber',
        'UnchangeableNationalIdentificationNumber',
        'ShopperStatement',
        'ShippingAddressCountry',
        'ShippingAddressPostalCode',
        'ShippingAddressCity',
        'ShippingAddressLine1',
        'ShippingAddressLine2',
        'ShippingAddress',
        'RequestDirectDebitMandate',
        'ChargeAccountID',
        'QuickDeposit',
        'IntegrationModule' // Old?
    ],
    requiredFields: ['NotificationURL', 'EndUserID', 'MessageID', 'Currency']
};
exports.refund = {
    method: 'Refund',
    dataFields: ['OrderID', 'Amount', 'Currency'],
    attributesFields: [],
    requiredFields: ['OrderID', 'Amount', 'Currency']
};
exports.accountPayout = {
    method: 'AccountPayout',
    dataFields: [
        'NotificationURL',
        'AccountID',
        'EndUserID',
        'MessageID',
        'Amount',
        'Currency'
    ],
    attributesFields: ['SenderInformation'],
    requiredFields: [
        'NotificationURL',
        'AccountID',
        'EndUserID',
        'MessageID',
        'Amount',
        'Currency'
    ]
};
exports.selectAccount = {
    // Old method?
    method: 'SelectAccount',
    dataFields: ['NotificationURL', 'EndUserID', 'MessageID'],
    attributesFields: [
        'Locale',
        'Country',
        'MobilePhone',
        'Firstname',
        'Lastname',
        'DateOfBirth',
        'NationalIdentificationNumber',
        'IP',
        'SuccessURL',
        'FailURL',
        'TemplateURL',
        'URLTarget',
        'RequestDirectDebitMandate',
        'Email',
        'UnchangeableNationalIdentificationNumber'
    ],
    requiredFields: ['NotificationURL', 'EndUserID', 'MessageID']
};
exports.charge = {
    // Old?
    method: 'Charge',
    dataFields: [
        'AccountID',
        'NotificationURL',
        'EndUserID',
        'MessageID',
        'Amount',
        'Currency'
    ],
    attributesFields: ['ShopperStatement', 'Email'],
    requiredFields: [
        'AccountID',
        'NotificationURL',
        'EndUserID',
        'MessageID',
        'Amount',
        'Currency'
    ]
};
exports.withdraw = {
    method: 'Withdraw',
    dataFields: ['NotificationURL', 'EndUserID', 'MessageID', 'Currency'],
    attributesFields: [
        'Firstname',
        'Lastname',
        'Email',
        'DateOfBirth',
        'Locale',
        'SuggestedMinAmount',
        'SuggestedMaxAmount',
        'Country',
        'IP',
        'SuccessURL',
        'FailURL',
        'TemplateURL',
        'URLTarget',
        'ClearingHouse',
        'BankNumber',
        'AccountNumber',
        'MobilePhone',
        'NationalIdentificationNumber',
        'UnchangeableNationalIdentificationNumber',
        'AddressCountry',
        'AddressPostalcode',
        'AddressCity',
        'AddressLine1',
        'AddressLine2',
        'Address',
        'ShopperStatement', // Old
        'IntegrationModule' // Old
    ],
    requiredFields: [
        'NotificationURL',
        'EndUserID',
        'MessageID',
        'Currency',
        'Firstname',
        'Lastname',
        'Email',
        'DateOfBirth'
    ]
};
exports.approveWithdrawal = {
    method: 'ApproveWithdrawal',
    dataFields: ['OrderID'],
    attributesFields: [],
    requiredFields: ['OrderID']
};
exports.denyWithdrawal = {
    method: 'DenyWithdrawal',
    dataFields: ['OrderID'],
    attributesFields: [],
    requiredFields: ['OrderID']
};
exports.balance = {
    method: 'Balance',
    dataFields: [], // TODO: The response will be an array
    attributesFields: [],
    requiredFields: []
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxPQUFPLEdBQW9CO0lBQ3BDLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7SUFDekQsZ0JBQWdCLEVBQUU7UUFDZCxVQUFVO1FBQ1YsV0FBVztRQUNYLFVBQVU7UUFDVixPQUFPO1FBQ1AsUUFBUTtRQUNSLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsUUFBUTtRQUNSLFNBQVM7UUFDVCxJQUFJO1FBQ0osWUFBWTtRQUNaLFNBQVM7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLGFBQWE7UUFDYiw4QkFBOEI7UUFDOUIsMENBQTBDO1FBQzFDLGtCQUFrQjtRQUNsQix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0IsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxtQkFBbUIsQ0FBQyxPQUFPO0tBQzlCO0lBQ0QsY0FBYyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7Q0FDNUUsQ0FBQTtBQUVZLFFBQUEsTUFBTSxHQUFvQjtJQUNuQyxNQUFNLEVBQUUsUUFBUTtJQUNoQixVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQztJQUM3QyxnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGNBQWMsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO0NBQ3BELENBQUE7QUFDWSxRQUFBLGFBQWEsR0FBb0I7SUFDMUMsTUFBTSxFQUFFLGVBQWU7SUFDdkIsVUFBVSxFQUFFO1FBQ1IsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxXQUFXO1FB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