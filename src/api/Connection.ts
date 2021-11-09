import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import qs from 'querystring';
import {ErrorResponse, Response} from 'src/types/api';

/**
 * The initialization options
 * @typedef {Object} connection~options
 * @property {string=} baseUrl - The base url to the API
 */

export default class Connection {
  client: AxiosInstance;

  /**
   * @param {connection~options} options
   */
  constructor(options: AxiosRequestConfig) {
    this.client = axios.create(options);
  }

  updateClient(options: AxiosRequestConfig) {
    this.client = axios.create(options);
  }

  /**
   * Call API using GET
   *
   * @param {string} route - The route to call
   * @param {object=} params - The call arguments
   * @returns {Promise<*>}
   */
  async GET(route: string, params = null) {
    return this.call(route, 'GET', false, params);
  }

  /**
   * Call API using POST
   *
   * @param {string} route - The route to call
   * @param {object} params - The call arguments
   * @returns {Promise<*>}
   */
  async POST(route: string, data: Object | null = null) {
    return this.call(route, 'POST', data);
  }

  /**
   * Call API using PUT
   *
   * @param {string} route - The route to call
   * @param {object=} data - The data to be submitted.
   * @returns {Promise<*>}
   */
  async PUT(route: string, data: Object | null = null) {
    return this.call(route, 'PUT', data);
  }

  /**
   * Call API using DELETE
   *
   * @param {string} route - The route to call
   * @param {object=} data - The data to be submitted.
   * @returns {Promise<*>}
   */
  async DELETE(route: string, data: Object | null = null) {
    return this.call(route, 'DELETE', data);
  }

  /**
   *
   * @param {string} route - The route to call
   * @param {string} method - HTTP method
   * @param {object=} data - The data to be submitted.
   * @param {object=} params - The call arguments
   * @returns {Promise<*>}
   */
  async call(
    route: string,
    method: Method = 'GET',
    data: Object | null = null,
    params: qs.ParsedUrlQueryInput | null = null,
  ): Promise<Response<any>> {
    if (params) {
      route = `${route}?${qs.stringify(params)}`;
    }
    const request: AxiosRequestConfig = {
      url: route,
      method,
      // params,
      data,

      headers: {
        Accept: 'application/json',
        'x-access-token': await AsyncStorage.getItem('token'),
        //Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    };

    try {
      const response = await this.client.request(request);
      return response.data;
    } catch (error: any) {
      // Allow client to deal with regular errors
      // Or intercept
      if (error.response) {
        return error.response.data;
      } else {
        const err: ErrorResponse = {error: 'Network error', data: <never>''};
        return err;
      }
    }
  }

  /**
   * Shortcut to: axios.interceptors.request.use
   * https://www.npmjs.com/package/axios#interceptors
   *
   * @param {requestCallback} onSuccess
   * @param {requestCallback} onError
   */
  beforeRequest(
    onSuccess: (
      value: AxiosRequestConfig,
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onError: (error: any) => any,
  ) {
    this.client.interceptors.request.use(onSuccess, onError);
  }

  /**
   * Shortcut to: axios.interceptors.response.use
   * https://www.npmjs.com/package/axios#interceptors
   *
   * @param {requestCallback} onSuccess
   * @param {requestCallback} onError
   */
  afterResponse(
    onSuccess: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onError: (error: any) => any,
  ) {
    this.client.interceptors.response.use(onSuccess, onError);
  }

  /**
   * Shortcut to: axios.interceptors.request.eject
   * https://www.npmjs.com/package/axios#interceptors
   *
   * @param {requestCallback} listener
   */
  stopBeforeRequest(listener: number) {
    this.client.interceptors.request.eject(listener);
  }

  /**
   * Shortcut to: axios.interceptors.response.eject
   * https://www.npmjs.com/package/axios#interceptors
   *
   * @param {requestCallback} listener
   */
  stopAfterResponse(listener: number) {
    this.client.interceptors.request.eject(listener);
  }
}
