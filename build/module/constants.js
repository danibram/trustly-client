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
    requiredFields: ['NotificationURL', 'EndUserID', 'MessageID', 'Currency']
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
        'RequestDirectDebitMandate',
        'Email'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQW9CO0lBQ3BDLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7SUFDekQsZ0JBQWdCLEVBQUU7UUFDZCxVQUFVO1FBQ1YsV0FBVztRQUNYLFVBQVU7UUFDVixPQUFPO1FBQ1AsUUFBUTtRQUNSLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsUUFBUTtRQUNSLFNBQVM7UUFDVCxJQUFJO1FBQ0osWUFBWTtRQUNaLFNBQVM7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLGFBQWE7UUFDYiw4QkFBOEI7UUFDOUIsMENBQTBDO1FBQzFDLGtCQUFrQjtRQUNsQix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0IsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxtQkFBbUIsQ0FBQyxPQUFPO0tBQzlCO0lBQ0QsY0FBYyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7Q0FDNUUsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBb0I7SUFDbkMsTUFBTSxFQUFFLFFBQVE7SUFDaEIsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7SUFDN0MsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQztDQUNwRCxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFvQjtJQUMxQyxjQUFjO0lBQ2QsTUFBTSxFQUFFLGVBQWU7SUFDdkIsVUFBVSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztJQUN6RCxnQkFBZ0IsRUFBRTtRQUNkLFFBQVE7UUFDUixTQUFTO1FBQ1QsYUFBYTtRQUNiLFdBQVc7UUFDWCxVQUFVO1FBQ1YsYUFBYTtRQUNiLDhCQUE4QjtRQUM5QixJQUFJO1FBQ0osWUFBWTtRQUNaLFNBQVM7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLDJCQUEyQjtRQUMzQixPQUFPO0tBQ1Y7SUFDRCxjQUFjLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQ2hFLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQW9CO0lBQ25DLE9BQU87SUFDUCxNQUFNLEVBQUUsUUFBUTtJQUNoQixVQUFVLEVBQUU7UUFDUixXQUFXO1FBQ1gsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxXQUFXO1FBQ1gsUUFBUTtRQUNSLFVBQVU7S0FDYjtJQUNELGdCQUFnQixFQUFFLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDO0lBQy9DLGNBQWMsRUFBRTtRQUNaLFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFDWCxRQUFRO1FBQ1IsVUFBVTtLQUNiO0NBQ0osQ0FBQTtBQUNELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBb0I7SUFDckMsTUFBTSxFQUFFLFVBQVU7SUFDbEIsVUFBVSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7SUFDckUsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXO1FBQ1gsVUFBVTtRQUNWLE9BQU87UUFDUCxhQUFhO1FBQ2IsUUFBUTtRQUNSLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsU0FBUztRQUNULElBQUk7UUFDSixZQUFZO1FBQ1osU0FBUztRQUNULGFBQWE7UUFDYixXQUFXO1FBQ1gsZUFBZTtRQUNmLFlBQVk7UUFDWixlQUFlO1FBQ2YsYUFBYTtRQUNiLDhCQUE4QjtRQUM5QiwwQ0FBMEM7UUFDMUMsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsY0FBYztRQUNkLGNBQWM7UUFDZCxTQUFTO1FBQ1Qsa0JBQWtCO1FBQ2xCLG1CQUFtQixDQUFDLE1BQU07S0FDN0I7SUFDRCxjQUFjLEVBQUU7UUFDWixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsV0FBVztRQUNYLFVBQVU7UUFDVixPQUFPO1FBQ1AsYUFBYTtLQUNoQjtDQUNKLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBb0I7SUFDOUMsTUFBTSxFQUFFLG1CQUFtQjtJQUMzQixVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDdkIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUM7Q0FDOUIsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBb0I7SUFDM0MsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDdkIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUM7Q0FDOUIsQ0FBQSJ9