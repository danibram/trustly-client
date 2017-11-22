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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvY2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUE7QUFDMUIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUE7QUFDNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUV0QyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBTSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFDUixJQUFJLE1BQU0sQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixDQUFDO0tBQ2xHLENBQUMsQ0FDTCxDQUFBO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQSJ9