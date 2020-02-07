import { Client } from './lib/Client';
import { serialize, trustlySerializeData } from './lib/trustlySerializeData';
import { readFile, root, sign, verify } from './lib/utils';
import { approveWithdrawal, charge, denyWithdrawal, deposit, refund, selectAccount, withdraw } from './specs';
export const TrustlyClient = Client;
export const constants = {
    deposit,
    refund,
    selectAccount,
    withdraw,
    approveWithdrawal,
    denyWithdrawal,
    charge
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDNUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxRCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixjQUFjLEVBQ2QsT0FBTyxFQUNQLE1BQU0sRUFDTixhQUFhLEVBQ2IsUUFBUSxFQUNYLE1BQU0sU0FBUyxDQUFBO0FBRWhCLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUE7QUFDbkMsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHO0lBQ3JCLE9BQU87SUFDUCxNQUFNO0lBQ04sYUFBYTtJQUNiLFFBQVE7SUFDUixpQkFBaUI7SUFDakIsY0FBYztJQUNkLE1BQU07Q0FDVCxDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHO0lBQ2pCLElBQUk7SUFDSixRQUFRO0NBQ1gsQ0FBQTtBQUNELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUNuQixTQUFTO0lBQ1Qsb0JBQW9CO0lBQ3BCLElBQUk7SUFDSixNQUFNO0NBQ1QsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQXVCLEVBQUUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JFLGVBQWUsTUFBTSxDQUFBIn0=