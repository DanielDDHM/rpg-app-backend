import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export type RequestConfig = AxiosRequestConfig

export type Response<T = any> = AxiosResponse<T>

export function get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
  return axios.get<T, Response<T>>(url, config);
}

export function post<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
  return axios.post<T, Response<T>>(url, config);
}

export function isRequestError(error: AxiosError): boolean {
  return !!(error.response && error.response.status);
}