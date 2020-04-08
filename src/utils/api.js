import Axios from 'axios';
import { isEmpty } from 'lodash'

export const BASE_URL = 'https://chatroom-vouch.herokuapp.com';

export const setToken = (token) => {
  if (!isEmpty(token)) {
    Axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token)
  } else {
    delete Axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

const AxiosInstance = Axios.create({
  baseURL: `${BASE_URL}/api`,
});

const APIRequest = (url, method = 'get', data, headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem('token') || null,
}) => {
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
  return AxiosInstance.request({
    url,
    method,
    [dataOrParams]: data,
    headers,
  });
};

export default APIRequest;