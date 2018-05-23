import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from './UserReducer';
import AlertReducer from './AlertReducer';
import CourseReducer from './CourseReducer';
import ModuleReducer from './ModuleReducer';
import TestReducer from './TestReducer';
import QuestionReducer from './QuestionReducer';
import ClientReducer from './ClientReducer';
import PolicyReducer from './PolicyReducer';

const reducers = {
  UserReducer,
  AlertReducer,
  CourseReducer,
  ModuleReducer,
  TestReducer,
  QuestionReducer,
  ClientReducer,
  PolicyReducer,
  form: formReducer,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
