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
        unsubscribed_courses: [],
        unsubscribed_courses_loading: true,
      });
    case CourseConstants.GETUNSUBSCRIBED_SUCCESS:
      return Object.assign({}, state, {
        unsubscribed_courses: action.courses,
        unsubscribed_courses_loading: false,
      });
    case CourseConstants.GETUNSUBSCRIBED_FAILURE:
      return Object.assign({}, state, {
        unsubscribed_courses: [],
        unsubscribed_courses_loading: false,
      });
    case CourseConstants.LOADCOURSE_REQUEST:
      return {
        course_loading: true,
      };
    case CourseConstants.LOADCOURSE_SUCCESS:
      return Object.assign({}, state, {
        course: action.course,
        course_loading: false,
      });
    case CourseConstants.LOADCOURSE_FAILURE:
      return {
        error: action.error,
        course_loading: false,
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
      return Object.assign({}, state, {
        loading: false,
      });
    case CourseConstants.EDIT_REQUEST:
      return {
        course_editing: true,
      };
    case CourseConstants.EDIT_SUCCESS:
      return {
        course_editing: false,
      };
    case CourseConstants.EDIT_FAILURE:
      return {
        error: action.error,
        course_editing: false,
      };
    case CourseConstants.CLEAR_COURSES:
      return {
        newCourseId: state.newCourseId,
      };
    case CourseConstants.LOADCOURSES_REQUEST:
      return {
        loading: true,
      };
    case CourseConstants.LOADCOURSES_SUCCESS:
      return Object.assign({}, state, {
        courses: action.courses,
        loading: false,
      });
    case CourseConstants.LOADCOURSES_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default CourseReducer;
