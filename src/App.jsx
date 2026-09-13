// src/Carrot.jsx
import React from 'react';
import {SnackbarProvider} from 'notistack';
import Routes from './routes';
import * as Helpers from './helpers';

import successImg from './assets/images/flash-success.svg';
import errorImg from './assets/images/flash-error.svg';
import infoImg from './assets/images/flash-info.svg';
import closeImg from './assets/images/flash-close.svg';

class App extends React.Component {
  render() {
    return (
      <SnackbarProvider
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        maxSnack={5}
        ref={Helpers.notification.reference}
        action={(key) => <div onClick={() => Helpers.notification.close(key)}>DISMISS</div>}
        content={(key, obj) => {
          if (
            window.location.pathname === '/' ||
            window.location.pathname === '/home/business' ||
            window.location.pathname === '/home/individual'
          ) {
            return <div />;
          }

          let message = obj;
          let title = '';
          let variant = 'info';

          try {
            const notification = JSON.parse(obj);
            message = notification.message;
            title = notification.title;
            variant = notification.variant;
          } catch (err) {
            console.log('Unable to parse notification object:', err);
          }

          return (
            <div className="notification" id={key}>
              <img
                className="notification-img"
                src={variant === 'error' ? errorImg : variant === 'success' ? successImg : infoImg}
                alt=''
              />

              <div>
                <div className="notification-title">{title}</div>
                <span className="notification-content">{message}</span>
              </div>

              <img
                className="notification-close"
                src={closeImg}
                alt="Dismiss"
                onClick={() => Helpers.notification.close(key)}
              />
            </div>
          );
        }}
      >
        <Routes />
      </SnackbarProvider>
    );
  }
}

export default App;
