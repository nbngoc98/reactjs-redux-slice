import axios from 'axios'

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': '*'
  },
})


const onRequestSuccess = async config => {
  const s = localStorage.getItem('member');
  const client = s != null ? JSON.parse(s) : {};
  const token = client?.access_token;
  if (token) {
      config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}

const onRequestFailure = error => Promise.reject(error);

const onResponseSuccess = res => {
  const response = res.data;
  return response;
};

const onResponseFailure = error => {
  //logout if token expired
  if ([UNAUTHORIZED, FORBIDDEN].includes(error?.response?.status)) {
      localStorage.removeItem('member');
      localStorage.removeItem('persist:root');
      window.location.href = '/login';
  }
  error =
      (error.response &&
          error.response.data &&
          error.response.data.message) ||
      error.message ||
      error.toString();
  return Promise.reject(error);
}

axiosClient.interceptors.request.use(onRequestSuccess, onRequestFailure);
axiosClient.interceptors.response.use(onResponseSuccess, onResponseFailure);

export default axiosClient
