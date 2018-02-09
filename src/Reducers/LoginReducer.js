import UserConstants from '../Constants/UserConstants';

const user = JSON.parse(localStorage.getItem('user')); // eslint-disable-line no-undef
const initialState = user ? { loggedIn: true, user } : {};

function AuthenticationReducer(state = initialState, action) {
  switch (action.type) {
    case UserConstants.LOGIN_REQUEST:
      return {
        loading: true,
        user: action.user,
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case UserConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UserConstants.LOGOUT:
      return {};
    case UserConstants.LOGIN_CLOSE:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default AuthenticationReducer;
