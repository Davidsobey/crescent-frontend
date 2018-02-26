import { UserConstants } from '../Constants/UserConstants';

const user = JSON.parse(localStorage.getItem('user')); // eslint-disable-line no-undef
const initialState = user ? { loggedIn: true, user } : {};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case UserConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case UserConstants.LOGIN_FAILURE:
      return {};
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default AuthReducer;
