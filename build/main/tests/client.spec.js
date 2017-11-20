"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ava_1 = require("ava");
const path = require("path");
const Client_1 = require("../lib/Client");
ava_1.test('Should init correctly', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let client = new Client_1.Client({
        username: 'merchant_username',
        password: 'merchant_password',
        privateKeyPath: path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem')
    });
    t.notThrows(() => client.init());
}));
ava_1.test('Should have methods', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let client = new Client_1.Client({
        username: 'merchant_username',
        password: 'merchant_password',
        privateKeyPath: path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem')
    });
    t.true(typeof client._createMethod === 'function');
    t.true(typeof client._makeRequest === 'function');
    t.true(typeof client._prepareRequest === 'function');
    t.true(typeof client.createNotificationResponse === 'function');
    t.true(typeof client.prepareNotificationResponse === 'function');
    t.true(typeof client.verifyResponse === 'function');
    t.true(typeof client.init === 'function');
    t.true(typeof client.withdraw === 'function');
    t.true(typeof client.deposit === 'function');
    t.true(typeof client.charge === 'function');
    t.true(typeof client.approveWithdrawal === 'function');
    t.true(typeof client.denyWithdrawal === 'function');
    t.true(typeof client.selectAccount === 'function');
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvY2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQTBCO0FBQzFCLDZCQUE0QjtBQUc1QiwwQ0FBc0M7QUFFdEMsVUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQU0sQ0FBQztJQUNqQyxJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQztRQUNwQixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQztLQUNsRyxDQUFDLENBQUE7SUFFRixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFNLENBQUM7SUFDL0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUM7UUFDcEIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsMEJBQTBCLENBQUM7S0FDbEcsQ0FBQyxDQUFBO0lBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxhQUFhLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDakQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssVUFBVSxDQUFDLENBQUE7SUFFcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsS0FBSyxVQUFVLENBQUMsQ0FBQTtJQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLDJCQUEyQixLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBRXpDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsaUJBQWlCLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDdEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxhQUFhLEtBQUssVUFBVSxDQUFDLENBQUE7QUFDdEQsQ0FBQyxDQUFBLENBQUMsQ0FBQSJ9