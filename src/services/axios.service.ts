import axios, { AxiosError, HttpStatusCode } from 'axios';
import { debounce } from 'lodash';

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
            // TODO: logout
            // window.location.href = '/auth/logout';
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
    }
    // else if (statusCode === HttpStatusCode.Forbidden) { //403
    //     window.location.href = '/';
    // }
    else {
      const { message } = response.data as { message: string | string[] };
      let toastMessage = '';
      if (Array.isArray(message)) {
        toastMessage = message[0];
      } else {
        toastMessage = message;
      }
      // toast(toastMessage, {
      //   type: 'error',
      // });
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

const DEBOUNCE_TIME = 200;

const showServiceUnavailableError = debounce(() => {
  console.log('service unavailable');
  // toast('Service unavailable! Please try again later!', {
  //     type: 'error',
  //     icon: <img src={serverErrorIcon} alt="" style={{ width: 20, height: 20 }} />
  // });
}, DEBOUNCE_TIME);

const showConnectionProblemError = debounce(() => {
  console.log('connection problem');
  // toast('Connection problem! Please try again later!', {
  //     type: 'error',
  //     icon: <img src={disconnectIcon} alt="" style={{ width: 20, height: 20 }} />
  // });
}, DEBOUNCE_TIME);
