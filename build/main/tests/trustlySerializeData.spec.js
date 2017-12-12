"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trustlySerializeData_1 = require("../lib/trustlySerializeData");
const ava_1 = require("ava");
ava_1.test('Should be serialize data', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let JsonToSerialize = {
        Username: 'merchant_username',
        Password: 'merchant_password',
        NotificationURL: 'URL_to_your_notification_service',
        EndUserID: '12345',
        MessageID: 'your_unique_deposit_id',
        Attributes: {
            Locale: 'sv_SE',
            Currency: 'SEK',
            IP: '123.123.123.123',
            MobilePhone: '+46709876543',
            Firstname: 'John',
            Lastname: 'Doe',
            NationalIdentificationNumber: '790131-1234'
        }
    };
    let serializationResult = 'AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username';
    let serializationJson = trustlySerializeData_1.trustlySerializeData(JsonToSerialize);
    t.deepEqual(serializationJson, serializationResult);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RseVNlcmlhbGl6ZURhdGEuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy90cnVzdGx5U2VyaWFsaXplRGF0YS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNFQUFrRTtBQUNsRSw2QkFBMEI7QUFFMUIsVUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQU0sQ0FBQztJQUNwQyxJQUFJLGVBQWUsR0FBRztRQUNsQixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsZUFBZSxFQUFFLGtDQUFrQztRQUNuRCxTQUFTLEVBQUUsT0FBTztRQUNsQixTQUFTLEVBQUUsd0JBQXdCO1FBQ25DLFVBQVUsRUFBRTtZQUNSLE1BQU0sRUFBRSxPQUFPO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixFQUFFLEVBQUUsaUJBQWlCO1lBQ3JCLFdBQVcsRUFBRSxjQUFjO1lBQzNCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsNEJBQTRCLEVBQUUsYUFBYTtTQUM5QztLQUNKLENBQUE7SUFDRCxJQUFJLG1CQUFtQixHQUNuQix1UkFBdVIsQ0FBQTtJQUUzUixJQUFJLGlCQUFpQixHQUFHLDJDQUFvQixDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBRTdELENBQUMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQTtBQUN2RCxDQUFDLENBQUEsQ0FBQyxDQUFBIn0=