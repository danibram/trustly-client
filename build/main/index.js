"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.helpers = exports.utils = exports.constants = exports.TrustlyClient = exports.Client = void 0;
const Client_1 = require("./lib/Client");
const trustlySerializeData_1 = require("./lib/trustlySerializeData");
const utils_1 = require("./lib/utils");
const specs_1 = require("./specs");
var Client_2 = require("./lib/Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_2.Client; } });
exports.TrustlyClient = Client_1.Client;
exports.constants = {
    deposit: specs_1.deposit,
    refund: specs_1.refund,
    selectAccount: specs_1.selectAccount,
    withdraw: specs_1.withdraw,
    approveWithdrawal: specs_1.approveWithdrawal,
    denyWithdrawal: specs_1.denyWithdrawal,
    charge: specs_1.charge,
};
exports.utils = {
    root: utils_1.root,
    readFile: utils_1.readFile,
};
exports.helpers = {
    serialize: trustlySerializeData_1.serialize,
    trustlySerializeData: trustlySerializeData_1.trustlySerializeData,
    sign: utils_1.sign,
    verify: utils_1.verify,
};
const client = (config) => new Client_1.Client(config);
exports.client = client;
exports.default = exports.client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUNBQXFDO0FBQ3JDLHFFQUE0RTtBQUM1RSx1Q0FBMEQ7QUFDMUQsbUNBUWdCO0FBRWhCLHVDQUFxQztBQUE1QixnR0FBQSxNQUFNLE9BQUE7QUFFRixRQUFBLGFBQWEsR0FBRyxlQUFNLENBQUE7QUFDdEIsUUFBQSxTQUFTLEdBQUc7SUFDckIsT0FBTyxFQUFQLGVBQU87SUFDUCxNQUFNLEVBQU4sY0FBTTtJQUNOLGFBQWEsRUFBYixxQkFBYTtJQUNiLFFBQVEsRUFBUixnQkFBUTtJQUNSLGlCQUFpQixFQUFqQix5QkFBaUI7SUFDakIsY0FBYyxFQUFkLHNCQUFjO0lBQ2QsTUFBTSxFQUFOLGNBQU07Q0FDVCxDQUFBO0FBQ1ksUUFBQSxLQUFLLEdBQUc7SUFDakIsSUFBSSxFQUFKLFlBQUk7SUFDSixRQUFRLEVBQVIsZ0JBQVE7Q0FDWCxDQUFBO0FBQ1ksUUFBQSxPQUFPLEdBQUc7SUFDbkIsU0FBUyxFQUFULGdDQUFTO0lBQ1Qsb0JBQW9CLEVBQXBCLDJDQUFvQjtJQUNwQixJQUFJLEVBQUosWUFBSTtJQUNKLE1BQU0sRUFBTixjQUFNO0NBQ1QsQ0FBQTtBQUVNLE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBdUIsRUFBRSxFQUFFLENBQUMsSUFBSSxlQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7QUFBeEQsUUFBQSxNQUFNLFVBQWtEO0FBQ3JFLGtCQUFlLGNBQU0sQ0FBQSJ9