export type MethodInterface = {
    method: string
    dataFields: string[]
    attributesFields: string[]
    requiredFields: string[]
}

/**
 * Minimal structural type for a fetch implementation. The global fetch of
 * Node.js >= 18 satisfies it, and so do undici, node-fetch or any wrapper
 * with the same call shape, so a custom implementation (proxy, interceptors,
 * mocks in tests...) can be injected via `ConfigInterface.fetch`.
 */
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
    /** Request timeout in milliseconds. Defaults to 2000, like v3. */
    timeout?: number
    /**
     * Extra options merged into every fetch call (headers, dispatcher,
     * agent...). Applied last, so they win over the defaults.
     */
    fetchOptions?: Record<string, any>
    /** Alternative fetch implementation. Defaults to the global fetch. */
    fetch?: FetchLike
}
