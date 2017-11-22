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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9hLFFBQUEsT0FBTyxHQUFvQjtJQUNwQyxNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO0lBQ3pELGdCQUFnQixFQUFFO1FBQ2QsVUFBVTtRQUNWLFdBQVc7UUFDWCxVQUFVO1FBQ1YsT0FBTztRQUNQLFFBQVE7UUFDUixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLFFBQVE7UUFDUixTQUFTO1FBQ1QsSUFBSTtRQUNKLFlBQVk7UUFDWixTQUFTO1FBQ1QsYUFBYTtRQUNiLFdBQVc7UUFDWCxhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLDBDQUEwQztRQUMxQyxrQkFBa0I7UUFDbEIsd0JBQXdCO1FBQ3hCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0QixpQkFBaUI7UUFDakIsMkJBQTJCO1FBQzNCLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsbUJBQW1CLENBQUMsT0FBTztLQUM5QjtJQUNELGNBQWMsRUFBRTtRQUNaLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7S0FDYjtDQUNKLENBQUE7QUFFWSxRQUFBLE1BQU0sR0FBb0I7SUFDbkMsTUFBTSxFQUFFLFFBQVE7SUFDaEIsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7SUFDN0MsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQztDQUNwRCxDQUFBO0FBRVksUUFBQSxhQUFhLEdBQW9CO0lBQzFDLGNBQWM7SUFDZCxNQUFNLEVBQUUsZUFBZTtJQUN2QixVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO0lBQ3pELGdCQUFnQixFQUFFO1FBQ2QsUUFBUTtRQUNSLFNBQVM7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLFVBQVU7UUFDVixhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLElBQUk7UUFDSixZQUFZO1FBQ1osU0FBUztRQUNULGFBQWE7UUFDYixXQUFXO1FBQ1gsMkJBQTJCO0tBQzlCO0lBQ0QsY0FBYyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztDQUNoRSxDQUFBO0FBRVksUUFBQSxNQUFNLEdBQW9CO0lBQ25DLE9BQU87SUFDUCxNQUFNLEVBQUUsUUFBUTtJQUNoQixVQUFVLEVBQUU7UUFDUixXQUFXO1FBQ1gsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxXQUFXO1FBQ1gsUUFBUTtRQUNSLFVBQVU7S0FDYjtJQUNELGdCQUFnQixFQUFFLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDO0lBQy9DLGNBQWMsRUFBRTtRQUNaLFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFDWCxRQUFRO1FBQ1IsVUFBVTtLQUNiO0NBQ0osQ0FBQTtBQUNZLFFBQUEsUUFBUSxHQUFvQjtJQUNyQyxNQUFNLEVBQUUsVUFBVTtJQUNsQixVQUFVLEVBQUU7UUFDUixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO0tBQ2I7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLFdBQVc7UUFDWCxVQUFVO1FBQ1YsT0FBTztRQUNQLGFBQWE7UUFDYixRQUFRO1FBQ1Isb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsSUFBSTtRQUNKLFlBQVk7UUFDWixTQUFTO1FBQ1QsYUFBYTtRQUNiLFdBQVc7UUFDWCxlQUFlO1FBQ2YsWUFBWTtRQUNaLGVBQWU7UUFDZixhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLDBDQUEwQztRQUMxQyxnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixjQUFjO1FBQ2QsY0FBYztRQUNkLFNBQVM7UUFDVCxrQkFBa0I7UUFDbEIsbUJBQW1CLENBQUMsTUFBTTtLQUM3QjtJQUNELGNBQWMsRUFBRTtRQUNaLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7UUFDVixXQUFXO1FBQ1gsVUFBVTtRQUNWLE9BQU87UUFDUCxhQUFhO0tBQ2hCO0NBQ0osQ0FBQTtBQUVZLFFBQUEsaUJBQWlCLEdBQW9CO0lBQzlDLE1BQU0sRUFBRSxtQkFBbUI7SUFDM0IsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDO0NBQzlCLENBQUE7QUFFWSxRQUFBLGNBQWMsR0FBb0I7SUFDM0MsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDdkIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUM7Q0FDOUIsQ0FBQSJ9