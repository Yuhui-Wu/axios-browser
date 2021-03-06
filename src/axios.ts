import Axios from './core/Axios';
import mergeConfig from './core/mergeConfig';
import defaults from './defaults';
import { AxiosRequestConfig, AxiosStatic } from './types';
import { extend } from './utils';

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);

  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config));
};

export default axios;
