export type MethodInterface = {
    method: string
    dataFields: string[]
    attributesFields: string[]
    requiredFields: string[]
}

/** Structural fetch type: the global fetch, undici, node-fetch or any mock with the same shape fits. */
export type FetchLike = (
    url: string,
    init?: {
        method?: string
        headers?: Record<string, string>
        body?: string
        signal?: AbortSignal
        [key: string]: any
    }
) => Promise<{
    ok: boolean
    status: number
    json(): Promise<any>
}>

export type ConfigInterface = {
    username: string
    password: string
    privateKeyPath?: string
    privateKey?: string
    environment?: string
    endpoint?: string
    publicKeyPath?: string
    publicKey?: string
    specs?: {
        [key: string]: MethodInterface
    }
    /** Request timeout in milliseconds, default 2000. */
    timeout?: number
    /** Extra options merged into every fetch call, applied last so they win over the defaults. */
    fetchOptions?: Record<string, any>
    /** Alternative fetch implementation, defaults to the global fetch. */
    fetch?: FetchLike
}
