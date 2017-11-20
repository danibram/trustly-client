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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy91dGlscy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUF3QixNQUFNLDZCQUE2QixDQUFBO0FBRTdFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFDMUIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUE7QUFDNUIsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFFeEIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQU0sQ0FBQztJQUNqQyxJQUFJLGNBQWMsR0FBRyx1UkFBdVIsQ0FBQTtJQUM1UyxJQUFJLGVBQWUsR0FBRywwVkFBMFYsQ0FBQTtJQUNoWCxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUE7SUFDdEIsSUFBSSxJQUFJLEdBQUcsc0NBQXNDLENBQUE7SUFFakQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsMEJBQTBCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV6SCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQ2hCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxFQUN2QyxVQUFVLENBQ2IsQ0FBQTtJQUVELENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBTSxDQUFDO0lBQ25DLElBQUksZUFBZSxHQUFHLDBWQUEwVixDQUFBO0lBRWhYLElBQUksSUFBSSxHQUFHLGtVQUFrVSxDQUFBO0lBRTdVLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLHlCQUF5QixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFdkgsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUNyQixJQUFJLEVBQ0osZUFBZSxFQUNmLFNBQVMsQ0FDWixDQUFBO0lBRUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUN4QixDQUFDLENBQUEsQ0FBQyxDQUFBIn0=