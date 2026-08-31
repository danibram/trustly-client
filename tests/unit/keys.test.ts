import { createPublicKey } from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import {
    TRUSTLY_PROD_PUBLIC_KEY,
    TRUSTLY_TEST_PUBLIC_KEY,
} from '../../src/keys'

const der = (pem: string) =>
    createPublicKey(pem).export({ type: 'spki', format: 'der' })

const pemFile = (name: string) =>
    readFileSync(join(__dirname, '..', '..', 'keys', name), 'utf8')

describe('embedded trustly keys', () => {
    it('prod constant matches keys/trustly.com.public.pem', () => {
        expect(der(TRUSTLY_PROD_PUBLIC_KEY)).toEqual(
            der(pemFile('trustly.com.public.pem'))
        )
    })

    it('test constant matches keys/test.trustly.com.public.pem', () => {
        expect(der(TRUSTLY_TEST_PUBLIC_KEY)).toEqual(
            der(pemFile('test.trustly.com.public.pem'))
        )
    })
})
