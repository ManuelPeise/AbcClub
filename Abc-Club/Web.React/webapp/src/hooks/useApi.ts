import React, { useEffect } from 'react'
import { IApiOptions, IApiResult } from '../lib/ApiJsonInterfaces'

const useApi = <TItem= any>(options: IApiOptions): IApiResult<TItem> => {

    const [items, setItems] = React.useState<TItem[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [apiOptions, setApiOptions] = React.useState<IApiOptions>(options)

    const get = React.useCallback(async (options?: IApiOptions) => {
        setApiOptions({...options, ...apiOptions})

        setIsLoading(true)
        await fetch(apiOptions.serviceUrl, {method:apiOptions.method, mode:'cors'})
        .then(async (res) =>{
            if(res.status === 200){

                const data: TItem[] = await JSON.parse(await JSON.stringify(await res.json()))

                setItems(data)
            }

            setIsLoading(false)
        })
    },[apiOptions])

    const post = async (options?: IApiOptions) => {
        setApiOptions({...options, ...apiOptions})
    }

    useEffect(()=>{
        const getData = async () =>{
            await get()
        }

        getData()
    },[])

    return{
        items,
        isLoading,
        dataIsBound: items?.length > 0,
        get,
        post
    }
}

export default useApi