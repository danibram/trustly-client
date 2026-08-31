import { ConfigInterface } from './Interfaces'
import { Client } from './lib/Client'
import { serialize, trustlySerializeData } from './lib/trustlySerializeData'
import { readFile, sign, verify } from './lib/utils'
import {
    approveWithdrawal,
    charge,
    denyWithdrawal,
    deposit,
    refund,
    selectAccount,
    withdraw,
} from './specs'

export { Client } from './lib/Client'
export { TRUSTLY_PROD_PUBLIC_KEY, TRUSTLY_TEST_PUBLIC_KEY } from './keys'
export { ConfigInterface, FetchLike, MethodInterface } from './Interfaces'

export const TrustlyClient = Client
export const constants = {
    deposit,
    refund,
    selectAccount,
    withdraw,
    approveWithdrawal,
    denyWithdrawal,
    charge,
}
export const utils = {
    readFile,
}
export const helpers = {
    serialize,
    trustlySerializeData,
    sign,
    verify,
}

export const client = (config: ConfigInterface) => new Client(config)
export default client
