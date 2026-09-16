import {combineReducers} from 'redux';

import admin from './admin';
import dashboard from './dashboard';
import faculty from './faculty';
import department from './department';
import level from './level';
import semester from './semester';
import course from './course';
import student from './student';

export default combineReducers({
  admin,
  dashboard,
  faculty,
  department,
  level,
  semester,
  course,
  student,
});