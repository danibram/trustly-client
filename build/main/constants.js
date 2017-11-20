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
    requiredFields: [
        'NotificationURL',
        'EndUserID',
        'MessageID',
        'Currency'
    ]
};
exports.refund = {
    method: 'Refund',
    dataFields: ['OrderID', 'Amount', 'Currency'],
    attributesFields: [],
    requiredFields: ['OrderID', 'Amount', 'Currency']
};
exports.selectAccount = {
    //Old method?
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
        'RequestDirectDebitMandate'
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
    dataFields: [
        'NotificationURL',
        'EndUserID',
        'MessageID',
        'Currency'
    ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsT0FBTyxHQUFHO0lBQ25CLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7SUFDekQsZ0JBQWdCLEVBQUU7UUFDZCxVQUFVO1FBQ1YsV0FBVztRQUNYLFVBQVU7UUFDVixPQUFPO1FBQ1AsUUFBUTtRQUNSLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsUUFBUTtRQUNSLFNBQVM7UUFDVCxJQUFJO1FBQ0osWUFBWTtRQUNaLFNBQVM7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLGFBQWE7UUFDYiw4QkFBOEI7UUFDOUIsMENBQTBDO1FBQzFDLGtCQUFrQjtRQUNsQix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0IsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxtQkFBbUIsQ0FBQyxPQUFPO0tBQzlCO0lBQ0QsY0FBYyxFQUFFO1FBQ1osaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtLQUNiO0NBQ0osQ0FBQTtBQUVZLFFBQUEsTUFBTSxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO0lBQzdDLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsY0FBYyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7Q0FDcEQsQ0FBQTtBQUVZLFFBQUEsYUFBYSxHQUFHO0lBQ3pCLGFBQWE7SUFDYixNQUFNLEVBQUUsZUFBZTtJQUN2QixVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO0lBQ3pELGdCQUFnQixFQUFFO1FBQ2QsUUFBUTtRQUNSLFNBQVM7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLFVBQVU7UUFDVixhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLElBQUk7UUFDSixZQUFZO1FBQ1osU0FBUztRQUNULGFBQWE7UUFDYixXQUFXO1FBQ1gsMkJBQTJCO0tBQzlCO0lBQ0QsY0FBYyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztDQUNoRSxDQUFBO0FBRVksUUFBQSxNQUFNLEdBQUc7SUFDbEIsT0FBTztJQUNQLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFVBQVUsRUFBRTtRQUNSLFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFDWCxRQUFRO1FBQ1IsVUFBVTtLQUNiO0lBQ0QsZ0JBQWdCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUM7SUFDL0MsY0FBYyxFQUFFO1FBQ1osV0FBVztRQUNYLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsV0FBVztRQUNYLFFBQVE7UUFDUixVQUFVO0tBQ2I7Q0FDSixDQUFBO0FBQ1ksUUFBQSxRQUFRLEdBQUc7SUFDcEIsTUFBTSxFQUFFLFVBQVU7SUFDbEIsVUFBVSxFQUFFO1FBQ1IsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtLQUNiO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXO1FBQ1gsVUFBVTtRQUNWLE9BQU87UUFDUCxhQUFhO1FBQ2IsUUFBUTtRQUNSLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsU0FBUztRQUNULElBQUk7UUFDSixZQUFZO1FBQ1osU0FBUztRQUNULGFBQWE7UUFDYixXQUFXO1FBQ1gsZUFBZTtRQUNmLFlBQVk7UUFDWixlQUFlO1FBQ2YsYUFBYTtRQUNiLDhCQUE4QjtRQUM5QiwwQ0FBMEM7UUFDMUMsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsY0FBYztRQUNkLGNBQWM7UUFDZCxTQUFTO1FBQ1Qsa0JBQWtCO1FBQ2xCLG1CQUFtQixDQUFDLE1BQU07S0FDN0I7SUFDRCxjQUFjLEVBQUU7UUFDWixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsV0FBVztRQUNYLFVBQVU7UUFDVixPQUFPO1FBQ1AsYUFBYTtLQUNoQjtDQUNKLENBQUE7QUFFWSxRQUFBLGlCQUFpQixHQUFHO0lBQzdCLE1BQU0sRUFBRSxtQkFBbUI7SUFDM0IsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDO0NBQzlCLENBQUE7QUFFWSxRQUFBLGNBQWMsR0FBRztJQUMxQixNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN2QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQztDQUM5QixDQUFBIn0=