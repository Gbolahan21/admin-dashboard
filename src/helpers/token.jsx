import Cookies from 'js-cookie';
import notification from './notification';

const text =
  'Kindly switch your browser to login, e.g, from Brave to Firefox/Chrome, your\n' +
  ' current browser is not fully supported. \n' +
  ' If the issue persists contact support@carrotccredit.com';

const getTokenKey = (type) => {
  if (type) {
    return type;
  }

  const role = window.localStorage.getItem('role');

  if (role === 'admin') {
    return 'adminToken';
  }

  if (role === 'lecturer') {
    return 'lecturerToken';
  }

  return 'token';
};

const token = {
  get: (type) => {
    try {
      const key = getTokenKey(type);
      return window.localStorage.getItem(key);
    } catch {
      try {
        const key = getTokenKey(type);
        return Cookies.get(key);
      } catch {
        return notification.error(text);
      }
    }
  },

  remove: (type) => {
    try {
      if (type) {
        window.localStorage.removeItem(type);
        Cookies.remove(type);
        return;
      }

      // Remove both role-specific tokens
      window.localStorage.removeItem('adminToken');
      window.localStorage.removeItem('lecturerToken');

      Cookies.remove('adminToken');
      Cookies.remove('lecturerToken');

      // Remove authentication role
      window.localStorage.removeItem('role');

    } catch {
      try {
        if (type) {
          Cookies.remove(type);
        } else {
          Cookies.remove('adminToken');
          Cookies.remove('lecturerToken');
          Cookies.remove('role');
        }
      } catch {
        notification.error(text);
      }
    }
  },

  set: (newToken, type) => {
    try {
      const key = getTokenKey(type);
      window.localStorage.setItem(key, newToken);
    } catch {
      try {
        const key = getTokenKey(type);
        Cookies.set(key, newToken);
      } catch {
        notification.error(text);
      }
    }
  },
};

export default token;