import { notification } from 'antd';

export const TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
}

export default (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
}