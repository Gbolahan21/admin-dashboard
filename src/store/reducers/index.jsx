import {combineReducers} from 'redux';

import admin from './admin';
import dashboard from './dashboard'

export default combineReducers({
  admin,
  dashboard,
});