import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UserReducer from "./UserReducer";
import AuthenticationReducer from "./LoginReducer";
import AlertReducer from "./AlertReducer";
import CourseReducer from "./CourseReducer";

const reducers = {
  UserReducer,
  AlertReducer,
  AuthenticationReducer,
  CourseReducer,
  form: formReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
