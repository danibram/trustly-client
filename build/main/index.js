"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./lib/Client");
const trustlySerializeData_1 = require("./lib/trustlySerializeData");
const utils_1 = require("./lib/utils");
const specs_1 = require("./specs");
var Client_2 = require("./lib/Client");
exports.Client = Client_2.Client;
exports.TrustlyClient = Client_1.Client;
exports.constants = {
    deposit: specs_1.deposit,
    refund: specs_1.refund,
    selectAccount: specs_1.selectAccount,
    withdraw: specs_1.withdraw,
    approveWithdrawal: specs_1.approveWithdrawal,
    denyWithdrawal: specs_1.denyWithdrawal,
    charge: specs_1.charge
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5Q0FBcUM7QUFDckMscUVBQTRFO0FBQzVFLHVDQUEwRDtBQUMxRCxtQ0FRZ0I7QUFFaEIsdUNBQXFDO0FBQTVCLDBCQUFBLE1BQU0sQ0FBQTtBQUVGLFFBQUEsYUFBYSxHQUFHLGVBQU0sQ0FBQTtBQUN0QixRQUFBLFNBQVMsR0FBRztJQUNyQixPQUFPLEVBQVAsZUFBTztJQUNQLE1BQU0sRUFBTixjQUFNO0lBQ04sYUFBYSxFQUFiLHFCQUFhO0lBQ2IsUUFBUSxFQUFSLGdCQUFRO0lBQ1IsaUJBQWlCLEVBQWpCLHlCQUFpQjtJQUNqQixjQUFjLEVBQWQsc0JBQWM7SUFDZCxNQUFNLEVBQU4sY0FBTTtDQUNULENBQUE7QUFDWSxRQUFBLEtBQUssR0FBRztJQUNqQixJQUFJLEVBQUosWUFBSTtJQUNKLFFBQVEsRUFBUixnQkFBUTtDQUNYLENBQUE7QUFDWSxRQUFBLE9BQU8sR0FBRztJQUNuQixTQUFTLEVBQVQsZ0NBQVM7SUFDVCxvQkFBb0IsRUFBcEIsMkNBQW9CO0lBQ3BCLElBQUksRUFBSixZQUFJO0lBQ0osTUFBTSxFQUFOLGNBQU07Q0FDVCxDQUFBO0FBRVksUUFBQSxNQUFNLEdBQUcsQ0FBQyxNQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLGVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyRSxrQkFBZSxjQUFNLENBQUEifQ==