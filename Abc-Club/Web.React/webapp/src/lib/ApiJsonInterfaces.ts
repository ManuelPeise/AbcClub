export interface IApiOptions{
    serviceUrl: string
    method: 'GET'|'POST'
    parameters?: string
}

export interface IApiResult<TItem = any>{
    items: TItem[]
    isLoading: boolean
    dataIsBound: boolean
    get: (options?: IApiOptions) => Promise<void>
    post: (options?: IApiOptions) => Promise<void>
}