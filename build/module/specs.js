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
export const accountPayout = {
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
        'Email',
        'UnchangeableNationalIdentificationNumber'
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
export const balance = {
    method: 'Balance',
    dataFields: [],
    attributesFields: [],
    requiredFields: []
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFvQjtJQUNwQyxNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO0lBQ3pELGdCQUFnQixFQUFFO1FBQ2QsVUFBVTtRQUNWLFdBQVc7UUFDWCxVQUFVO1FBQ1YsT0FBTztRQUNQLFFBQVE7UUFDUixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLFFBQVE7UUFDUixTQUFTO1FBQ1QsSUFBSTtRQUNKLFlBQVk7UUFDWixTQUFTO1FBQ1QsYUFBYTtRQUNiLFdBQVc7UUFDWCxhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLDBDQUEwQztRQUMxQyxrQkFBa0I7UUFDbEIsd0JBQXdCO1FBQ3hCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0QixpQkFBaUI7UUFDakIsMkJBQTJCO1FBQzNCLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsbUJBQW1CLENBQUMsT0FBTztLQUM5QjtJQUNELGNBQWMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO0NBQzVFLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQW9CO0lBQ25DLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO0lBQzdDLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsY0FBYyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7Q0FDcEQsQ0FBQTtBQUNELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBb0I7SUFDMUMsTUFBTSxFQUFFLGVBQWU7SUFDdkIsVUFBVSxFQUFFO1FBQ1IsaUJB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