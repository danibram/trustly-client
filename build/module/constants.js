export const deposit = {
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
export const refund = {
    method: 'Refund',
    dataFields: ['OrderID', 'Amount', 'Currency'],
    attributesFields: [],
    requiredFields: ['OrderID', 'Amount', 'Currency']
};
export const selectAccount = {
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
export const charge = {
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
export const withdraw = {
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
export const approveWithdrawal = {
    method: 'ApproveWithdrawal',
    dataFields: ['OrderID'],
    attributesFields: [],
    requiredFields: ['OrderID']
};
export const denyWithdrawal = {
    method: 'DenyWithdrawal',
    dataFields: ['OrderID'],
    attributesFields: [],
    requiredFields: ['OrderID']
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQW9CO0lBQ3BDLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7SUFDekQsZ0JBQWdCLEVBQUU7UUFDZCxVQUFVO1FBQ1YsV0FBVztRQUNYLFVBQVU7UUFDVixPQUFPO1FBQ1AsUUFBUTtRQUNSLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsUUFBUTtRQUNSLFNBQVM7UUFDVCxJQUFJO1FBQ0osWUFBWTtRQUNaLFNBQVM7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLGFBQWE7UUFDYiw4QkFBOEI7UUFDOUIsMENBQTBDO1FBQzFDLGtCQUFrQjtRQUNsQix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0IsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxtQkFBbUIsQ0FBQyxPQUFPO0tBQzlCO0lBQ0QsY0FBYyxFQUFFO1FBQ1osaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtLQUNiO0NBQ0osQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBb0I7SUFDbkMsTUFBTSxFQUFFLFFBQVE7SUFDaEIsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7SUFDN0MsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQztDQUNwRCxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFvQjtJQUMxQyxjQUFjO0lBQ2QsTUFBTSxFQUFFLGVBQWU7SUFDdkIsVUFBVSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztJQUN6RCxnQkFBZ0IsRUFBRTtRQUNkLFFBQVE7UUFDUixTQUFTO1FBQ1QsYUFBYTtRQUNiLFdBQVc7UUFDWCxVQUFVO1FBQ1YsYUFBYTtRQUNiLDhCQUE4QjtRQUM5QixJQUFJO1FBQ0osWUFBWTtRQUNaLFNBQVM7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLDJCQUEyQjtLQUM5QjtJQUNELGNBQWMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7Q0FDaEUsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBb0I7SUFDbkMsT0FBTztJQUNQLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFVBQVUsRUFBRTtRQUNSLFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFDWCxRQUFRO1FBQ1IsVUFBVTtLQUNiO0lBQ0QsZ0JBQWdCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUM7SUFDL0MsY0FBYyxFQUFFO1FBQ1osV0FBVztRQUNYLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsV0FBVztRQUNYLFFBQVE7UUFDUixVQUFVO0tBQ2I7Q0FDSixDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFvQjtJQUNyQyxNQUFNLEVBQUUsVUFBVTtJQUNsQixVQUFVLEVBQUU7UUFDUixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO0tBQ2I7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLFdBQVc7UUFDWCxVQUFVO1FBQ1YsT0FBTztRQUNQLGFBQWE7UUFDYixRQUFRO1FBQ1Isb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsSUFBSTtRQUNKLFlBQVk7UUFDWixTQUFTO1FBQ1QsYUFBYTtRQUNiLFdBQVc7UUFDWCxlQUFlO1FBQ2YsWUFBWTtRQUNaLGVBQWU7UUFDZixhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLDBDQUEwQztRQUMxQyxnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixjQUFjO1FBQ2QsY0FBYztRQUNkLFNBQVM7UUFDVCxrQkFBa0I7UUFDbEIsbUJBQW1CLENBQUMsTUFBTTtLQUM3QjtJQUNELGNBQWMsRUFBRTtRQUNaLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7UUFDVixXQUFXO1FBQ1gsVUFBVTtRQUNWLE9BQU87UUFDUCxhQUFhO0tBQ2hCO0NBQ0osQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFvQjtJQUM5QyxNQUFNLEVBQUUsbUJBQW1CO0lBQzNCLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN2QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQztDQUM5QixDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFvQjtJQUMzQyxNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN2QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQztDQUM5QixDQUFBIn0=