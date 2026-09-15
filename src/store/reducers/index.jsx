import {combineReducers} from 'redux';

import admin from './admin';
import dashboard from './dashboard';
import faculty from './faculty';
import department from './department';
import level from './level';
import semester from './semester';

export default combineReducers({
  admin,
  dashboard,
  faculty,
  department,
  level,
  semester,
});