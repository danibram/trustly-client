"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../lib/utils");
const trustlySerializeData_1 = require("../lib/trustlySerializeData");
const ava_1 = require("ava");
const path = require("path");
const fs = require("fs");
ava_1.test('Should sign correctly', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let serializedData = 'AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username';
    let signatureResult = 'UXh7ZdkrG4cLo0lyhF3nm+UPo/ZCM+JuUmZq6Zr4W7oygQVeWEK/Hi2Y0sjH8/aE7g39beGtFPw0IugWhETwaT/zj7GIfey4GsbKjUP4O3NZup0v1g1KS9obpl1nDvpfdmKhN1kUvLyQso5/77xErDTlkvlITiaWmN4XquHPX2RtV33tRuDWKgy51wot1K3IHUUl4Ws9cL66XagSmKanypR2Q5x7cTJmu0K3FSWYOfxl7V/PkMGN+9Optcsjr8w4r1Q5CCnfo9B0NbM9QMXPTD8VUHP/dwCS+yV9ErOcDOITFof7XvYa8/cY5JiwC3KhGQWD2wiv/KqDxNqKbCrokQ==';
    let method = 'Deposit';
    let uuid = '258a2184-2842-b485-25ca-293525152425';
    let privateKey = fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem'), 'utf8');
    let signature = utils_1.sign(trustlySerializeData_1.serialize(method, uuid, serializedData), privateKey);
    t.deepEqual(signature, signatureResult);
}));
ava_1.test('Should verify correctly', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let signatureResult = 'UXh7ZdkrG4cLo0lyhF3nm+UPo/ZCM+JuUmZq6Zr4W7oygQVeWEK/Hi2Y0sjH8/aE7g39beGtFPw0IugWhETwaT/zj7GIfey4GsbKjUP4O3NZup0v1g1KS9obpl1nDvpfdmKhN1kUvLyQso5/77xErDTlkvlITiaWmN4XquHPX2RtV33tRuDWKgy51wot1K3IHUUl4Ws9cL66XagSmKanypR2Q5x7cTJmu0K3FSWYOfxl7V/PkMGN+9Optcsjr8w4r1Q5CCnfo9B0NbM9QMXPTD8VUHP/dwCS+yV9ErOcDOITFof7XvYa8/cY5JiwC3KhGQWD2wiv/KqDxNqKbCrokQ==';
    let data = 'Deposit258a2184-2842-b485-25ca-293525152425AttributesCurrencySEKFirstnameJohnIP123.123.123.123LastnameDoeLocalesv_SEMobilePhone+46709876543NationalIdentificationNumber790131-1234EndUserID12345MessageIDyour_unique_deposit_idNotificationURLURL_to_your_notification_servicePasswordmerchant_passwordUsernamemerchant_username';
    let publicKey = fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_public_key.pem'), 'utf8');
    let verification = utils_1.verify(data, signatureResult, publicKey);
    t.true(verification);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy91dGlscy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUEyQztBQUMzQyxzRUFBNkU7QUFFN0UsNkJBQTBCO0FBQzFCLDZCQUE0QjtBQUM1Qix5QkFBd0I7QUFFeEIsVUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQU0sQ0FBQztJQUNqQyxJQUFJLGNBQWMsR0FBRyx1UkFBdVIsQ0FBQTtJQUM1UyxJQUFJLGVBQWUsR0FBRywwVkFBMFYsQ0FBQTtJQUNoWCxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUE7SUFDdEIsSUFBSSxJQUFJLEdBQUcsc0NBQXNDLENBQUE7SUFFakQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsMEJBQTBCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV6SCxJQUFJLFNBQVMsR0FBRyxZQUFJLENBQ2hCLGdDQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsRUFDdkMsVUFBVSxDQUNiLENBQUE7SUFFRCxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUEsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQU0sQ0FBQztJQUNuQyxJQUFJLGVBQWUsR0FBRywwVkFBMFYsQ0FBQTtJQUVoWCxJQUFJLElBQUksR0FBRyxrVUFBa1UsQ0FBQTtJQUU3VSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRXZILElBQUksWUFBWSxHQUFHLGNBQU0sQ0FDckIsSUFBSSxFQUNKLGVBQWUsRUFDZixTQUFTLENBQ1osQ0FBQTtJQUVELENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDeEIsQ0FBQyxDQUFBLENBQUMsQ0FBQSJ9