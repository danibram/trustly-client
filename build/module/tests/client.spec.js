import * as tslib_1 from "tslib";
import { test } from 'ava';
import * as path from 'path';
import { Client } from '../lib/Client';
test('Should init correctly', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    t.notThrows(() => new Client({
        username: 'merchant_username',
        password: 'merchant_password',
        privateKeyPath: path.resolve(__dirname, '..', '..', 'keys', 'test', 'merchant_private_key.pem')
    }));
}));
test('Should have methods', (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let client = new Client({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvY2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFDMUIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUE7QUFHNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUV0QyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBTSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFDUixJQUFJLE1BQU0sQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixDQUFDO0tBQ2xHLENBQUMsQ0FDTCxDQUFBO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFNLENBQUM7SUFDL0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDcEIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsMEJBQTBCLENBQUM7S0FDbEcsQ0FBQyxDQUFBO0lBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxhQUFhLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDakQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssVUFBVSxDQUFDLENBQUE7SUFFcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsS0FBSyxVQUFVLENBQUMsQ0FBQTtJQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLDJCQUEyQixLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBRW5ELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsaUJBQWlCLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDdEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxhQUFhLEtBQUssVUFBVSxDQUFDLENBQUE7QUFDdEQsQ0FBQyxDQUFBLENBQUMsQ0FBQSJ9