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
      return Object.assign({}, state, {
        newCourseId: undefined,
        creating: true,
      });
    case CourseConstants.CREATE_SUCCESS:
      return Object.assign({}, state, {
        newCourseId: action.newCourseId,
        creating: false,
      });
    case CourseConstants.CREATE_FAILURE:
      return Object.assign({}, state, {
        newCourseId: undefined,
        creating: false,
      });
    case CourseConstants.GETALL_REQUEST:
      return Object.assign({}, state, {
        courses: [],
        loading: true,
      });
    case CourseConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        courses: action.courses,
        loading: false,
      });
    case CourseConstants.GETALL_FAILURE:
      return Object.assign({}, state, {
        courses: [],
        loading: false,
      });
    case CourseConstants.GETUNSUBSCRIBED_REQUEST:
      return Object.assign({}, state, {
        courses: [],
        loading: true,
      });
    case CourseConstants.GETUNSUBSCRIBED_SUCCESS:
      return Object.assign({}, state, {
        courses: action.courses,
        loading: false,
      });
    case CourseConstants.GETUNSUBSCRIBED_FAILURE:
      return Object.assign({}, state, {
        courses: [],
        loading: false,
      });
    case CourseConstants.LOADCOURSE_REQUEST:
      return Object.assign({}, state, {
        courses: [],
        loading: true,
      });
    case CourseConstants.LOADCOURSE_SUCCESS:
      return Object.assign({}, state, {
        courses: action.courses,
        loading: false,
      });
    case CourseConstants.LOADCOURSE_FAILURE:
      return Object.assign({}, state, {
        courses: [],
        loading: false,
      });
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
      return Object.assign({}, state, {
        loading: false,
      });
    case CourseConstants.CLEAR_COURSES:
      return {
        courses: [],
      };
    case UserConstants.LOGOUT:
      return {
        courses: [],
      };
    default:
      return state;
  }
}

export default CourseReducer;
