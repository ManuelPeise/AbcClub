export interface IApiOptions {
  serviceUrl: string;
  method: "GET" | "POST";
  parameters?: any;
}

export interface IApiResult<TItem = any> {
  items: TItem[];
  isLoading: boolean;
  dataIsBound: boolean;
  sendRequest: (options?: IApiOptions) => Promise<void>;
  post: (options?: IApiOptions) => Promise<void>;
}
