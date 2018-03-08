import CourseConstants from '../Constants/CourseConstants';

function CourseReducer(state = {}, action) {
  switch (action.type) {
    case CourseConstants.CREATE_REQUEST:
      return {
        courses: action.courseName,
      };
    case CourseConstants.CREATE_SUCCESS:
      return {
        courses: action.courseName,
      };
    case CourseConstants.CREATE_FAILURE:
      return {};
    case CourseConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case CourseConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        courses: action.courses,
        loading: false,
      });
    case CourseConstants.GETALL_FAILURE:
      return {
        courses: {},
      };
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
        course: {},
      };
    default:
      return state;
  }
}

export default CourseReducer;
