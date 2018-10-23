"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        'ShopperStatement',
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
    dataFields: [],
    attributesFields: [],
    requiredFields: []
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFYSxRQUFBLE9BQU8sR0FBb0I7SUFDcEMsTUFBTSxFQUFFLFNBQVM7SUFDakIsVUFBVSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztJQUN6RCxnQkFBZ0IsRUFBRTtRQUNkLFVBQVU7UUFDVixXQUFXO1FBQ1gsVUFBVTtRQUNWLE9BQU87UUFDUCxRQUFRO1FBQ1Isb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixRQUFRO1FBQ1IsU0FBUztRQUNULElBQUk7UUFDSixZQUFZO1FBQ1osU0FBUztRQUNULGFBQWE7UUFDYixXQUFXO1FBQ1gsYUFBYTtRQUNiLDhCQUE4QjtRQUM5QiwwQ0FBMEM7UUFDMUMsa0JBQWtCO1FBQ2xCLHdCQUF3QjtRQUN4QiwyQkFBMkI7UUFDM0IscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsaUJBQWlCO1FBQ2pCLDJCQUEyQjtRQUMzQixpQkFBaUI7UUFDakIsY0FBYztRQUNkLG1CQUFtQixDQUFDLE9BQU87S0FDOUI7SUFDRCxjQUFjLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztDQUM1RSxDQUFBO0FBRVksUUFBQSxNQUFNLEdBQW9CO0lBQ25DLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO0lBQzdDLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsY0FBYyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7Q0FDcEQsQ0FBQTtBQUNZLFFBQUEsYUFBYSxHQUFvQjtJQUMxQyxNQUFNLEVBQUUsZUFBZTtJQUN2QixVQUFVLEVBQUU7UUFDUixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFD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