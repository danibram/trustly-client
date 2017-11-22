import { Client } from './lib/Client';
import { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge } from './constants';
import { root, readFile, sign, verify } from './lib/utils';
import { serialize, trustlySerializeData } from './lib/trustlySerializeData';
export const TrustlyClient = Client;
export const constants = { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge };
export const utils = {
    root,
    readFile
};
export const helpers = {
    serialize,
    trustlySerializeData,
    sign,
    verify
};
export const client = (config) => new Client(config);
export default client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBbUIsTUFBTSxjQUFjLENBQUE7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFtQixNQUFNLGFBQWEsQ0FBQTtBQUNsSSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUU1RSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFBO0FBQ25DLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLENBQUE7QUFDaEgsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHO0lBQ2pCLElBQUk7SUFDSixRQUFRO0NBQ1gsQ0FBQTtBQUNELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUNuQixTQUFTO0lBQ1Qsb0JBQW9CO0lBQ3BCLElBQUk7SUFDSixNQUFNO0NBQ1QsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQXVCLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckUsZUFBZSxNQUFNLENBQUEifQ==