import Axios from 'axios';
import { isEmpty } from 'lodash'

export const setToken = (token) => {
  if (!isEmpty(token)) {
    (Axios.defaults.headers.common['Authorization'] = token);
    localStorage.setItem('token', token)
  } else {
    delete Axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

export default Axios.create({
  baseURL: 'http://localhost:8001/api',
});
