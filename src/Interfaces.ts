import { AxiosRequestConfig } from 'axios';

export type MethodInterface = {
    method: string
    dataFields: string[]
    attributesFields: string[]
    requiredFields: string[]
}

export type ConfigInterface = {
    username: string
    password: string
    privateKeyPath?: string
    privateKey?: string
    environment?: string
    endpoint?: string
    publicKeyPath?: string
    specs?: {
        [key: string]: MethodInterface
    }
    axiosRequestConfig?: Pick<AxiosRequestConfig, 'timeout'>
}
