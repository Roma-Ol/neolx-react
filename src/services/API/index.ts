import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface ApiRequestConfig extends AxiosRequestConfig {
  requiresAuth?: boolean;
}

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')!).token
      : null;

    if (token && config.requiresAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response.data.error) {
      toast.error(error.response.data.error);
    }

    if (error.response && error.response.status === 401) {
      // TODO: Handle unauthorized errors (e.g., redirect to login)
    }
    return Promise.reject(error);
  },
);

export const useApi = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  config: ApiRequestConfig = {},
): Promise<T> => {
  console.log(url);
  const response = await api.request<T>({
    method,
    url,
    data,
    ...config,
  });

  return response.data;
};
