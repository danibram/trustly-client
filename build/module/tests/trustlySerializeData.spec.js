import * as tslib_1 from "tslib";
import { trustlySerializeData } from '../lib/trustlySerializeData';
import { test } from 'ava';
test('Should be serialize data', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
    let serializationJson = trustlySerializeData(JsonToSerialize);
    t.deepEqual(serializationJson, serializationResult);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RseVNlcmlhbGl6ZURhdGEuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy90cnVzdGx5U2VyaWFsaXplRGF0YS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWEsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQTtBQUM3RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBRTFCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFNLENBQUM7SUFDcEMsSUFBSSxlQUFlLEdBQUc7UUFDbEIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLGVBQWUsRUFBRSxrQ0FBa0M7UUFDbkQsU0FBUyxFQUFFLE9BQU87UUFDbEIsU0FBUyxFQUFFLHdCQUF3QjtRQUNuQyxVQUFVLEVBQUU7WUFDUixNQUFNLEVBQUUsT0FBTztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsRUFBRSxFQUFFLGlCQUFpQjtZQUNyQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsTUFBTTtZQUNqQixRQUFRLEVBQUUsS0FBSztZQUNmLDRCQUE0QixFQUFFLGFBQWE7U0FDOUM7S0FDSixDQUFBO0lBQ0QsSUFBSSxtQkFBbUIsR0FBRyx1UkFBdVIsQ0FBQTtJQUVqVCxJQUFJLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBRTdELENBQUMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQTtBQUN2RCxDQUFDLENBQUEsQ0FBQyxDQUFBIn0=