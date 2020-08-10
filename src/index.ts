import { ConfigInterface } from './Interfaces'
import { Client } from './lib/Client'
import { serialize, trustlySerializeData } from './lib/trustlySerializeData'
import { readFile, root, sign, verify } from './lib/utils'
import {
    approveWithdrawal,
    charge,
    denyWithdrawal,
    deposit,
    refund,
    selectAccount,
    withdraw
} from './specs'

export { Client } from './lib/Client'

export const TrustlyClient = Client
export const constants = {
    deposit,
    refund,
    selectAccount,
    withdraw,
    approveWithdrawal,
    denyWithdrawal,
    charge
}
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
