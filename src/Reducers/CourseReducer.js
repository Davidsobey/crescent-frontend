import { isNumber } from 'util';
import CourseConstants from '../Constants/CourseConstants';
import UserConstants from '../Constants/UserConstants';

function filterById(id, delId) {
  if (isNumber(id) && id !== 0 && id !== delId) {
    return true;
  }
  return false;
}

function CourseReducer(state = {}, action) {
  switch (action.type) {
    case CourseConstants.CREATE_REQUEST:
      return state;
    case CourseConstants.CREATE_SUCCESS:
      return state;
    case CourseConstants.CREATE_FAILURE:
      return state;
    case CourseConstants.GETALL_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case CourseConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        courses: action.courses,
        loading: false,
      });
    case CourseConstants.GETALL_FAILURE:
      return state;
    case CourseConstants.GETUNSUBSCRIBED_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case CourseConstants.GETUNSUBSCRIBED_SUCCESS:
      return Object.assign({}, state, {
        courses: action.courses,
        loading: false,
      });
    case CourseConstants.GETUNSUBSCRIBED_FAILURE:
      return state;
    case CourseConstants.LOADCOURSE_REQUEST:
      return {
        loading: true,
      };
    case CourseConstants.LOADCOURSE_SUCCESS:
      return Object.assign({}, state, {
        course: action.course,
        loading: false,
      });
    case CourseConstants.LOADCOURSE_FAILURE:
      return {
        courses: undefined,
      };
    case CourseConstants.DELETE_REQUEST:
      return Object.assign({}, state, {
        courses: state.courses.filter(obj => filterById(obj.id, action.id)),
        loading: true,
      });
    case CourseConstants.DELETE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
      });
    case CourseConstants.DELETE_FAILURE:
      return state;
    case CourseConstants.CLEAR_COURSES:
      return {};
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default CourseReducer;
