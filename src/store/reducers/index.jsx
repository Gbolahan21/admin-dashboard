import {combineReducers} from 'redux';

import admin from './admin';
import attendance from './attendance';
import dashboard from './dashboard';
import faculty from './faculty';
import department from './department';
import level from './level';
import semester from './semester';
import course from './course';
import student from './student';
import lecturer from './lecturer';
import lecturerDashboard from "./lecturerDashboard";

export default combineReducers({
  admin,
  attendance,
  dashboard,
  faculty,
  department,
  level,
  semester,
  course,
  student,
  lecturer,
  lecturerDashboard
});