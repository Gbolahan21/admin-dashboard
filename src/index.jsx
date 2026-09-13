import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import store from './store';
import App from './App';

import './assets/styles/index.css';
import './assets/styles/screen-1023w.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
