import {combineReducers} from 'redux';

import admin from './admin';
import dashboard from './dashboard';
import faculty from './faculty';

export default combineReducers({
  admin,
  dashboard,
  faculty,
});