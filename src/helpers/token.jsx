import Cookies from 'js-cookie';
import notification from './notification';

const text =
  'Kindly switch your browser to login, e.g, from Brave to Firefox/Chrome, your\n' +
  ' current browser is not fully supported. \n' +
  ' If the issue persists contact support@carrotccredit.com';

const token = {
  get: (type) => {
    try {
      const item = window.localStorage.getItem(type || 'user:token');
      return item;
    } catch {
      try {
        const item = Cookies.get(type || 'user:token');
        return item;
      } catch {
        return notification.error(text);
      }
    }
  },
  remove: (type) => {
    try {
      window.localStorage.removeItem(type || 'user:token');
    } catch {
      try {
        Cookies.remove(type || 'user:token');
      } catch {
        notification.error(text);
      }
    }
  },
  set: (newToken, type) => {
    try {
      window.localStorage.setItem(type || 'user:token', newToken);
    } catch {
      try {
        Cookies.set(type || 'user:token', newToken);
      } catch {
        notification.error(text);
      }
    }
  },
};
export default token;
