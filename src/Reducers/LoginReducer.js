import UserConstants from '../Constants/UserConstants';

function UserReducer(state = {}, action) {
  switch (action.type) {
    case UserConstants.LOGIN_REQUEST:
      return {
        loading: true,
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loading: false,
        user: action.user,
      };
    case UserConstants.LOGIN_FAILURE:
      return {
        loading: false,
      };
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default UserReducer;
