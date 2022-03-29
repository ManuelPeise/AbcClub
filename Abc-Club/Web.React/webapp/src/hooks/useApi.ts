import React, { useEffect } from "react";
import { IApiOptions, IApiResult } from "../lib/ApiJsonInterfaces";

const useApi = <TItem = any>(options: IApiOptions): IApiResult<TItem> => {
  const [items, setItems] = React.useState<TItem[]>([] as TItem[]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [apiOptions, setApiOptions] = React.useState<IApiOptions>(options);

  const sendRequest = React.useCallback(
    async (options?: IApiOptions) => {
      setApiOptions({ ...apiOptions, ...options });
      setIsLoading(true);

      await fetch(options?.serviceUrl ?? apiOptions.serviceUrl, {
        method: options?.method ?? apiOptions.method,
        mode: "cors",
      }).then(async (res) => {
        if (res.status === 200) {
          const data: TItem[] = await JSON.parse(
            await JSON.stringify(await res.json())
          );

          setItems(data);
        }

        setIsLoading(false);
      });
    },
    [apiOptions]
  );

  const post = async (options?: IApiOptions) => {
    setApiOptions({ ...options, ...apiOptions });

    setIsLoading(true);
  };

  useEffect(() => {
    const getData = async () => {
      await sendRequest();
    };

    getData();
  }, []);

  return {
    items,
    isLoading,
    dataIsBound: items?.length > 0,
    sendRequest,
    post,
  };
};

export default useApi;
