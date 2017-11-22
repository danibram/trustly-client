import * as tslib_1 from "tslib";
import { sign, verify } from '../lib/utils';
import { serialize } from '../lib/trustlySerializeData';
import { test } from 'ava';
import * as path from 'path';
import * as fs from 'fs';
test('Should sign correctly', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let serializedData = 'AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username';
    let signatureResult = 'UXh7ZdkrG4cLo0lyhF3nm+UPo/ZCM+JuUmZq6Zr4W7oygQVeWEK/Hi2Y0sjH8/aE7g39beGtFPw0IugWhETwaT/zj7GIfey4GsbKjUP4O3NZup0v1g1KS9obpl1nDvpfdmKhN1kUvLyQso5/77xErDTlkvlITiaWmN4XquHPX2RtV33tRuDWKgy51wot1K3IHUUl4Ws9cL66XagSmKanypR2Q5x7cTJmu0K3FSWYOfxl7V/PkMGN+9Optcsjr8w4r1Q5CCnfo9B0NbM9QMXPTD8VUHP/dwCS+yV9ErOcDOITFof7XvYa8/cY5JiwC3KhGQWD2wiv/KqDxNqKbCrokQ==';
    let method = 'Deposit';
    let uuid = '258a2184-2842-b485-25ca-293525152425';
    let privateKey = fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem'), 'utf8');
    let signature = sign(serialize(method, uuid, serializedData), privateKey);
    t.deepEqual(signature, signatureResult);
}));
test('Should verify correctly', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let signatureResult = 'UXh7ZdkrG4cLo0lyhF3nm+UPo/ZCM+JuUmZq6Zr4W7oygQVeWEK/Hi2Y0sjH8/aE7g39beGtFPw0IugWhETwaT/zj7GIfey4GsbKjUP4O3NZup0v1g1KS9obpl1nDvpfdmKhN1kUvLyQso5/77xErDTlkvlITiaWmN4XquHPX2RtV33tRuDWKgy51wot1K3IHUUl4Ws9cL66XagSmKanypR2Q5x7cTJmu0K3FSWYOfxl7V/PkMGN+9Optcsjr8w4r1Q5CCnfo9B0NbM9QMXPTD8VUHP/dwCS+yV9ErOcDOITFof7XvYa8/cY5JiwC3KhGQWD2wiv/KqDxNqKbCrokQ==';
    let data = 'Deposit258a2184-2842-b485-25ca-293525152425AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username';
    let publicKey = fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_public_key.pem'), 'utf8');
    let verification = verify(data, signatureResult, publicKey);
    t.true(verification);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy91dGlscy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUE7QUFFdkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQTtBQUMxQixPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQTtBQUM1QixPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQTtBQUV4QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBTSxDQUFDO0lBQ2pDLElBQUksY0FBYyxHQUFHLHVSQUF1UixDQUFBO0lBQzVTLElBQUksZUFBZSxHQUFHLDBWQUEwVixDQUFBO0lBQ2hYLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQTtJQUN0QixJQUFJLElBQUksR0FBRyxzQ0FBc0MsQ0FBQTtJQUVqRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRXpILElBQUksU0FBUyxHQUFHLElBQUksQ0FDaEIsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLEVBQ3ZDLFVBQVUsQ0FDYixDQUFBO0lBRUQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFNLENBQUM7SUFDbkMsSUFBSSxlQUFlLEdBQUcsMFZBQTBWLENBQUE7SUFFaFgsSUFBSSxJQUFJLEdBQUcsa1VBQWtVLENBQUE7SUFFN1UsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUseUJBQXlCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV2SCxJQUFJLFlBQVksR0FBRyxNQUFNLENBQ3JCLElBQUksRUFDSixlQUFlLEVBQ2YsU0FBUyxDQUNaLENBQUE7SUFFRCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ3hCLENBQUMsQ0FBQSxDQUFDLENBQUEifQ==