import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UserReducer from "./UserReducer";
import AuthenticationReducer from "./LoginReducer";
import AlertReducer from "./AlertReducer";

const reducers = {
  UserReducer,
  AlertReducer,
  AuthenticationReducer,
  form: formReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
