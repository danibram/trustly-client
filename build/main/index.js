"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./lib/Client");
const constants_1 = require("./constants");
const utils_1 = require("./lib/utils");
const trustlySerializeData_1 = require("./lib/trustlySerializeData");
exports.TrustlyClient = Client_1.Client;
exports.constants = { deposit: constants_1.deposit, refund: constants_1.refund, selectAccount: constants_1.selectAccount, withdraw: constants_1.withdraw, approveWithdrawal: constants_1.approveWithdrawal, denyWithdrawal: constants_1.denyWithdrawal, charge: constants_1.charge };
exports.utils = {
    root: utils_1.root,
    readFile: utils_1.readFile
};
exports.helpers = {
    serialize: trustlySerializeData_1.serialize,
    trustlySerializeData: trustlySerializeData_1.trustlySerializeData,
    sign: utils_1.sign,
    verify: utils_1.verify
};
exports.client = (config) => new Client_1.Client(config);
exports.default = exports.client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBc0Q7QUFFdEQsMkNBQWtJO0FBQ2xJLHVDQUEwRDtBQUMxRCxxRUFBNEU7QUFFL0QsUUFBQSxhQUFhLEdBQUcsZUFBTSxDQUFBO0FBQ3RCLFFBQUEsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFQLG1CQUFPLEVBQUUsTUFBTSxFQUFOLGtCQUFNLEVBQUUsYUFBYSxFQUFiLHlCQUFhLEVBQUUsUUFBUSxFQUFSLG9CQUFRLEVBQUUsaUJBQWlCLEVBQWpCLDZCQUFpQixFQUFFLGNBQWMsRUFBZCwwQkFBYyxFQUFFLE1BQU0sRUFBTixrQkFBTSxFQUFFLENBQUE7QUFDbkcsUUFBQSxLQUFLLEdBQUc7SUFDakIsSUFBSSxFQUFKLFlBQUk7SUFDSixRQUFRLEVBQVIsZ0JBQVE7Q0FDWCxDQUFBO0FBQ1ksUUFBQSxPQUFPLEdBQUc7SUFDbkIsU0FBUyxFQUFULGdDQUFTO0lBQ1Qsb0JBQW9CLEVBQXBCLDJDQUFvQjtJQUNwQixJQUFJLEVBQUosWUFBSTtJQUNKLE1BQU0sRUFBTixjQUFNO0NBQ1QsQ0FBQTtBQUVZLFFBQUEsTUFBTSxHQUFHLENBQUMsTUFBdUIsS0FBSyxJQUFJLGVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyRSxrQkFBZSxjQUFNLENBQUEifQ==