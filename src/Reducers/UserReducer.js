import { isNumber } from 'util';
import UserConstants from '../Constants/UserConstants';

function filterById(id, delId) {
  if (isNumber(id) && id !== 0 && id !== delId) {
    return true;
  }
  return false;
}

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
    case UserConstants.GET_ALL_ROLES_REQUEST:
      return {
        loading: true,
      };
    case UserConstants.GET_ALL_ROLES_SUCCESS:
      return {
        roles: action.roles,
      };
    case UserConstants.GET_ALL_ROLES_FAILURE:
      return {
        loading: false,
        roles: [],
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
    case UserConstants.DELETE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case UserConstants.DELETE_SUCCESS:
      return Object.assign({}, state, {
        users: state.users.filter(obj => filterById(obj.id, action.id)),
        loading: false,
      });
    case UserConstants.DELETE_FAILURE:
      return state;
    default:
      return state;
  }
}

export default UserReducer;
