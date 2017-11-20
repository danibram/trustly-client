"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ava_1 = require("ava");
const path = require("path");
const Client_1 = require("../lib/Client");
ava_1.test('Should init correctly', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    t.notThrows(() => new Client_1.Client({
        username: 'merchant_username',
        password: 'merchant_password',
        privateKeyPath: path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem')
    }));
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
    t.true(typeof client.withdraw === 'function');
    t.true(typeof client.deposit === 'function');
    t.true(typeof client.charge === 'function');
    t.true(typeof client.approveWithdrawal === 'function');
    t.true(typeof client.denyWithdrawal === 'function');
    t.true(typeof client.selectAccount === 'function');
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvY2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQTBCO0FBQzFCLDZCQUE0QjtBQUc1QiwwQ0FBc0M7QUFFdEMsVUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQU0sQ0FBQztJQUNqQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQ1IsSUFBSSxlQUFNLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQztLQUNsRyxDQUFDLENBQ0wsQ0FBQTtBQUNMLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBTSxDQUFDO0lBQy9CLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDO1FBQ3BCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixDQUFDO0tBQ2xHLENBQUMsQ0FBQTtJQUVGLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsYUFBYSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsWUFBWSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsZUFBZSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBRXBELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsMEJBQTBCLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQywyQkFBMkIsS0FBSyxVQUFVLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLGNBQWMsS0FBSyxVQUFVLENBQUMsQ0FBQTtJQUVuRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQTtJQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQTtJQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQTtJQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLGlCQUFpQixLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ3RELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsYUFBYSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0FBQ3RELENBQUMsQ0FBQSxDQUFDLENBQUEifQ==