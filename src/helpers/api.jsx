import axiosLib from 'axios';
// import { jwtDecode } from 'jwt-decode';

import token from './token';
// import authRedirect from './authRedirect';

let axios = axiosLib;
const api =
  (url, method, data, {success, error}, actionTypes) =>
  (dispatch, mockAxios) => {
    const {responder, loading, error: errorConstant, report} = actionTypes;

    if (mockAxios?.get) {
      axios = mockAxios;
    }

    dispatch({
      payload: url,
      type: loading,
    });
    axios.defaults.headers.common.Authorization = `Bearer ${token.get()}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios[method.toLowerCase()](`${import.meta.env.VITE_BASE_URL}${url}`, data)
      .then((res) => {
        dispatch({
          payload: url,
          type: loading,
        });
        dispatch({
          payload: res.data,
          type: responder,
        });

        if (typeof success === 'function' && report !== false) {
          success(res.data, dispatch);
        }

        return true;
      })
      .catch((e) => {
        dispatch({
          payload: url,
          type: loading,
        });
        dispatch({
          errorObj: e,
          payload: e.response && e.response.data,
          type: errorConstant,
        });

        if (typeof error === 'function' && report !== false) {
          error(e.response && e.response.data, dispatch);
        }

        // const redirectToSignin = () => {
        //   token.remove();
        //   const returnPath = authRedirect.getCurrentReturnPath();
        //   window.location = returnPath ? authRedirect.buildSigninPath(returnPath) : '/signin';
        // };

        // if (e.response && e.response.status === 401) {
        //   redirectToSignin();
        // }

        // const userToken = token.get('user:token') && jwtDecode(token.get('user:token'));
        // const isExpired = userToken?.exp * 1000 < Date.now();
        // if (isExpired) {
        //   redirectToSignin();
        // }

        return false;
      });
  };

export default api;
