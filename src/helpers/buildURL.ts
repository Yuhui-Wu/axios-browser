import { isDate, isPlainObject } from '../utils';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

/**
 *
 * @param url The base of the url
 * @param params The params to be appended
 * @returns The formatted url
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    let val = params[key];
    if (val === null || val === undefined) {
      return;
    }

    let values: string[];

    // foo: ['bar', 'baz'] => foo[]=bar&foo[]=baz
    if (Array.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }

    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString();
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val);
      }
      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });

  let serializedParams = parts.join('&');
  if (serializedParams) {
    // {url: 'base/get?#hash', params:{bar:'baz'}} => /base/get?bar=baz
    let hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    // {url: 'base/get?foo=bar', params:{bar:'baz'}} => /base/get?foo=bar&bar=baz
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}
