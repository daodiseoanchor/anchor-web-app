import { WasmFetchBaseParams, WasmQueryData } from '../interface';
import { defaultLcdFetcher, LcdFetcher, LcdResult } from './fetch';

export interface LcdFetchParams<WasmQueries>
  extends WasmFetchBaseParams<WasmQueries> {
  lcdFetcher?: LcdFetcher;
  lcdEndpoint: string;
  requestInit?: Omit<RequestInit, 'method' | 'body'>;
}

export async function lcdFetch<WasmQueries>({
  id,
  wasmQuery,
  lcdEndpoint,
  lcdFetcher = defaultLcdFetcher,
  requestInit,
}: LcdFetchParams<WasmQueries>): Promise<WasmQueryData<WasmQueries>> {
  const wasmKeys: Array<keyof WasmQueries> = Object.keys(wasmQuery) as Array<
    keyof WasmQueries
  >;

  const rawData = await Promise.all(
    wasmKeys.map((key) => {
      const { query, contractAddress } = wasmQuery[key];
      const endpoint = `${lcdEndpoint}/wasm/contracts/${contractAddress}/store?query_msg=${JSON.stringify(
        query,
      )}${id ? '&' + id : ''}`;
      return lcdFetcher<LcdResult<any>>(endpoint, requestInit);
    }),
  );

  const result = wasmKeys.reduce((resultObject, key, i) => {
    const { result, height } = rawData[i];

    //@ts-ignore
    resultObject[key] = result;

    const blockHeight: number = +height;

    if (
      typeof resultObject.$blockHeight !== 'number' ||
      blockHeight < resultObject.$blockHeight
    ) {
      resultObject.$blockHeight = blockHeight;
    }

    return resultObject;
  }, {} as WasmQueryData<WasmQueries>);

  return result;
}
