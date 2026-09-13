import React from 'react';

window.notification = {};
class Notification {
  reference = React.createRef();

  close = (key) => {
    if (this.reference.current) {
      this.reference.current.closeSnackbar(key);
    }
  };

  success = (message, title = '') => {
    if (this.reference.current) {
      const obj = {
        message,
        title: title || 'Success',
        variant: 'success',
      };
      this.reference.current.enqueueSnackbar(JSON.stringify(obj), {
        autoHideDuration: 5000,
        preventDuplicate: true,
        variant: 'success',
      });
    }
  };

  error = (message, title = '') => {
    if (this.reference.current) {
      const obj = {
        message,
        title: title || 'Error!',
        variant: 'error',
      };
      this.reference.current.enqueueSnackbar(JSON.stringify(obj), {
        autoHideDuration: 5000,
        preventDuplicate: true,
        style: {whiteSpace: 'pre-line'},
        variant: 'error',
      });
    }
  };

  info = (message, title = '') => {
    if (this.reference.current) {
      const obj = {
        message,
        title: title || 'Info',
        variant: 'info',
      };
      this.reference.current.enqueueSnackbar(JSON.stringify(obj), {
        autoHideDuration: 5000,
        preventDuplicate: true,
        variant: 'info',
      });
    }
  };
}

export default new Notification();
