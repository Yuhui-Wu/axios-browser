import { buildURL } from '../helpers/buildURL';
import { flattenHeaders } from '../helpers/headers';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import transform from './transform';
import xhr from './xhr';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then((res) => {
    return transformResponseData(res);
  });
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}

// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config;
//   return processHeaders(headers, data);
// }

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data);
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}
