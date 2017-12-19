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
exports.credit = {
    method: 'credit',
    dataFields: [
        'Amount',
        'Currency',
        'AccountID',
        'NotificationID',
        'EndUserID',
        'MessageID',
        'Timestamp',
        'OrderID'
    ],
    attributesFields: [],
    requiredFields: ['OrderID', 'Amount', 'Currency']
};
exports.refund = {
    method: 'Refund',
    dataFields: ['OrderID', 'Amount', 'Currency'],
    attributesFields: [],
    requiredFields: ['OrderID', 'Amount', 'Currency']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9hLFFBQUEsT0FBTyxHQUFvQjtJQUNwQyxNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO0lBQ3pELGdCQUFnQixFQUFFO1FBQ2QsVUFBVTtRQUNWLFdBQVc7UUFDWCxVQUFVO1FBQ1YsT0FBTztRQUNQLFFBQVE7UUFDUixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLFFBQVE7UUFDUixTQUFTO1FBQ1QsSUFBSTtRQUNKLFlBQVk7UUFDWixTQUFTO1FBQ1QsYUFBYTtRQUNiLFdBQVc7UUFDWCxhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLDBDQUEwQztRQUMxQyxrQkFBa0I7UUFDbEIsd0JBQXdCO1FBQ3hCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0QixpQkFBaUI7UUFDakIsMkJBQTJCO1FBQzNCLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsbUJBQW1CLENBQUMsT0FBTztLQUM5QjtJQUNELGNBQWMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO0NBQzVFLENBQUE7QUFFWSxRQUFBLE1BQU0sR0FBb0I7SUFDbkMsTUFBTSxFQUFFLFFBQVE7SUFDaEIsVUFBVSxFQUFFO1FBQ1IsUUFBUTtRQUNSLFVBQVU7UUFDVixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFNBQVM7S0FDWjtJQUNELGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsY0FBYyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7Q0FDcEQsQ0FBQTtBQUVZLFFBQUEsTUFBTSxHQUFvQjtJQUNuQyxNQUFNLEVB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