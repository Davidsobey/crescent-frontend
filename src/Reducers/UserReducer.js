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
      return Object.assign({}, state, {
        users: [],
        loading: true,
      });
    case UserConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        users: action.users,
        loading: false,
      });
    case UserConstants.GETALL_FAILURE:
      return Object.assign({}, state, {
        users: [],
        loading: false,
        error: action.error,
      });
    case UserConstants.GET_ALL_ROLES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case UserConstants.GET_ALL_ROLES_SUCCESS:
      return Object.assign({}, state, {
        roles: action.roles,
        loading: false,
      });
    case UserConstants.GET_ALL_ROLES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        roles: [],
      });
    case UserConstants.REGISTER_REQUEST:
      return Object.assign({}, state, {
        users: action.userName,
        creating: true,
      });
    case UserConstants.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        users: action.userName,
        creating: false,
      });
    case UserConstants.REGISTER_FAILURE:
      return Object.assign({}, state, {
        creating: false,
      });
    case UserConstants.ENROL_REQUEST:
      return Object.assign({}, state, {
        enrolment: action.enrolment,
        enrolling: true,
      });
    case UserConstants.ENROL_SUCCESS:
      return Object.assign({}, state, {
        enrolment: action.enrolment,
        enrolling: false,
      });
    case UserConstants.ENROL_FAILURE:
      return Object.assign({}, state, {
        enrolment: undefined,
        enrolling: false,
      });
    case UserConstants.GETUSER_REQUEST:
      return {
        user_loading: true,
      };
    case UserConstants.GETUSER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        user_loading: false,
      });
    case UserConstants.GETUSER_FAILURE:
      return {
        error: action.error,
        user_loading: false,
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
    case UserConstants.EDIT_USER_REQUEST:
      return Object.assign({}, state, {
        user_editing: true,
      });
    case UserConstants.EDIT_USER_SUCCESS:
      return Object.assign({}, state, {
        user: undefined,
        user_editing: false,
      });
    case UserConstants.EDIT_USER_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        user_editing: false,
      });
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default UserReducer;
