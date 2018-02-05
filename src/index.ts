import { Client } from './lib/Client'

import { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge } from './specs'
import { ConfigInterface, MethodInterface } from './Interfaces'
import { root, readFile, sign, verify } from './lib/utils'
import { serialize, trustlySerializeData } from './lib/trustlySerializeData'

export const TrustlyClient = Client
export const constants = { deposit, refund, selectAccount, withdraw, approveWithdrawal, denyWithdrawal, charge }
export const utils = {
    root,
    readFile
}
export const helpers = {
    serialize,
    trustlySerializeData,
    sign,
    verify
}

export const client = (config: ConfigInterface) => new Client(config)
export default client
