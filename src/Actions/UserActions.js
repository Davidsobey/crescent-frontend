import UserConstants from "../Constants/UserConstants";
import UserService from "../Services/UserService";
import { AlertActions } from "./AlertActions";
import history from "../Helpers/History";

const UserActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    UserService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/home");
      },
      error => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: UserConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  UserService.logout();
  return { type: UserConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    UserService.register(user).then(
      user => {
        dispatch(success());
        history.push("/login");
        dispatch(AlertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: UserConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    UserService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: UserConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: UserConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: UserConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    UserService.delete(id).then(
      user => {
        dispatch(success(id));
      },
      error => {
        dispatch(failure(id, error));
      }
    );
  };

  function request(id) {
    return { type: UserConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: UserConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: UserConstants.DELETE_FAILURE, id, error };
  }
}

export default UserActions;
