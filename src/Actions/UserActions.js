import UserConstants from '../Constants/UserConstants';
import UserService from '../Services/UserService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function login(username, password) {
  function request(user) {
    return { type: UserConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ username }));
    UserService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push('/home');
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function logout() {
  UserService.logout();
  return { type: UserConstants.LOGOUT };
}

function close() {
  return { type: UserConstants.LOGIN_CLOSE };
}

function register(user) {
  function request() {
    return { type: UserConstants.REGISTER_REQUEST, user };
  }
  function success() {
    return { type: UserConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ user }));

    UserService.register(user).then(
      () => {
        dispatch(success(user));
        history.push('/user/list');
        dispatch(AlertActions.success(`User ${user} created successfully.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getAll() {
  function request() {
    return { type: UserConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: UserConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: UserConstants.GETALL_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request());

    UserService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error)),
    );
  };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
  function request() {
    return { type: UserConstants.DELETE_REQUEST, id };
  }
  function success() {
    return { type: UserConstants.DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: UserConstants.DELETE_FAILURE, id, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    UserService.delete(id).then(
      () => {
        dispatch(success(id));
      },
      (error) => {
        dispatch(failure(id, error));
      },
    );
  };
}

// function enrolUser(id) {
// }

const UserActions = {
  login,
  logout,
  close,
  register,
  getAll,
  delete: deleteUser,
};

export default UserActions;
