import axios from 'axios';

const axiosService = axios.create({
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
      !(error.config.url.indexOf('/auth/login') === 0) &&
      !(error.config.url.indexOf('/auth/refresh') === 0)
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
