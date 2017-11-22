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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvY2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQTBCO0FBQzFCLDZCQUE0QjtBQUM1QiwwQ0FBc0M7QUFFdEMsVUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQU0sQ0FBQztJQUNqQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQ1IsSUFBSSxlQUFNLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQztLQUNsRyxDQUFDLENBQ0wsQ0FBQTtBQUNMLENBQUMsQ0FBQSxDQUFDLENBQUEifQ==