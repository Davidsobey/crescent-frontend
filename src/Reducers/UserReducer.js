import UserConstants from '../Constants/UserConstants';

function UserReducer(state = {}, action) {
  switch (action.type) {
    case UserConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case UserConstants.GETALL_SUCCESS:
      return {
        users: action.users,
      };
    case UserConstants.GETALL_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case UserConstants.REGISTER_REQUEST:
      return {
        users: action.userName,
      };
    case UserConstants.REGISTER_SUCCESS:
      return {
        users: action.userName,
      };
    case UserConstants.REGISTER_FAILURE:
      return state;
    case UserConstants.ENROL_REQUEST:
      return {
        enrolments: action.enrolment,
      };
    case UserConstants.ENROL_SUCCESS:
      return {
        enrolments: action.enrolment,
      };
    case UserConstants.ENROL_FAILURE:
      return state;
    case UserConstants.GETUSER_REQUEST:
      return {
        loading: true,
      };
    case UserConstants.GETUSER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      });
    case UserConstants.GETUSER_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}

export default UserReducer;
