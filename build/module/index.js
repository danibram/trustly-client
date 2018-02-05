import { Client } from './lib/Client';
import { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge } from './specs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUVyQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFN0csT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFNUUsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQTtBQUNuQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFBO0FBQ2hILE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRztJQUNqQixJQUFJO0lBQ0osUUFBUTtDQUNYLENBQUE7QUFDRCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDbkIsU0FBUztJQUNULG9CQUFvQjtJQUNwQixJQUFJO0lBQ0osTUFBTTtDQUNULENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyRSxlQUFlLE1BQU0sQ0FBQSJ9