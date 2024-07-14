import axios, { AxiosError, HttpStatusCode } from 'axios';
import { throttle } from 'lodash';
import { globalValues } from '../utils';
import { AuthStorageService } from './auth-storage.service';

export const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.config.url.indexOf('/auth/login') !== 0 &&
      error.config.url.indexOf('/auth/refresh') !== 0
    ) {
      // try to get new access token and retry failed api
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // get new access token
          await axiosService.get('/auth/refresh');
          // retry request
          return axios(originalRequest);
        } catch (error: any) {
          if (error.response.status === 401) {
            globalValues.setUser!({});
            AuthStorageService.resetAll();
            globalValues.navigate!('/login');
          } else {
            return Promise.reject(error);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

export const axiosErrorHandler = (error: AxiosError) => {
  // console.log(error);
  const response = error?.response;
  const request = error?.request;
  // here we have access the config used to make the api call (we can make a retry using this conf)
  // const config = error?.config

  if (error.code === AxiosError.ERR_NETWORK) {
    // connection problem
    showConnectionProblemError();
  } else if (response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx the http status code mentioned above
    const statusCode = response?.status;
    if (
      statusCode === HttpStatusCode.BadGateway || // 502
      statusCode === HttpStatusCode.ServiceUnavailable // 503
    ) {
      // server problem
      showServiceUnavailableError();
    } else if (statusCode === HttpStatusCode.Forbidden /*403*/) {
      globalValues.navigate!('/');
    } else {
      const { message } = response.data as { message: string | string[] };
      let errorMessage = '';
      if (Array.isArray(message)) {
        errorMessage = message[0];
      } else {
        errorMessage = message;
      }
      globalValues.messageApi!.error(errorMessage);
    }
  } else if (request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in Node.js
    console.log(
      'Axios error. The request was made but no response was received',
      error,
    );
  }
};

const THROTTLE_TIME = 200;

const showServiceUnavailableError = throttle(() => {
  globalValues.messageApi!.error(
    'Service unavailable! Please try again later!',
  );
}, THROTTLE_TIME);

const showConnectionProblemError = throttle(() => {
  globalValues.messageApi!.error('Connection problem! Please try again later!');
}, THROTTLE_TIME);
