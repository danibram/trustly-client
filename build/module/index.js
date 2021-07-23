import { Client } from './lib/Client';
import { serialize, trustlySerializeData } from './lib/trustlySerializeData';
import { readFile, root, sign, verify } from './lib/utils';
import { approveWithdrawal, charge, denyWithdrawal, deposit, refund, selectAccount, withdraw, } from './specs';
export { Client } from './lib/Client';
export const TrustlyClient = Client;
export const constants = {
    deposit,
    refund,
    selectAccount,
    withdraw,
    approveWithdrawal,
    denyWithdrawal,
    charge,
};
export const utils = {
    root,
    readFile,
};
export const helpers = {
    serialize,
    trustlySerializeData,
    sign,
    verify,
};
export const client = (config) => new Client(config);
export default client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDNUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxRCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixjQUFjLEVBQ2QsT0FBTyxFQUNQLE1BQU0sRUFDTixhQUFhLEVBQ2IsUUFBUSxHQUNYLE1BQU0sU0FBUyxDQUFBO0FBRWhCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFFckMsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQTtBQUNuQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUc7SUFDckIsT0FBTztJQUNQLE1BQU07SUFDTixhQUFhO0lBQ2IsUUFBUTtJQUNSLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsTUFBTTtDQUNULENBQUE7QUFDRCxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUc7SUFDakIsSUFBSTtJQUNKLFFBQVE7Q0FDWCxDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHO0lBQ25CLFNBQVM7SUFDVCxvQkFBb0I7SUFDcEIsSUFBSTtJQUNKLE1BQU07Q0FDVCxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBdUIsRUFBRSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckUsZUFBZSxNQUFNLENBQUEifQ==