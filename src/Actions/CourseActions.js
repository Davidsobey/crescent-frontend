import CourseConstants from "../Constants/CourseConstants";
import CourseService from "../Services/CourseService";
import { AlertActions } from "./AlertActions";
import history from "../Helpers/History";

const CourseActions = {
  create,
  getAll
};

function create(courseName, courseDescription) {
  return dispatch => {
    dispatch(request({ courseName }));
    CourseService.create(courseName, courseDescription).then(
      user => {
        dispatch(success(courseName));
        history.push("/course/list");
      },
      error => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      }
    );
  };

  function request(courseName) {
    return { type: CourseConstants.CREATE_REQUEST, courseName };
  }
  function success(courseName) {
    return { type: CourseConstants.CREATE_SUCCESS, courseName };
  }
  function failure(error) {
    return { type: CourseConstants.CREATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    CourseService.getAll().then(
      courses => dispatch(success(courses)),
      error => {
        dispatch(failure(error)), dispatch(AlertActions.error(error));
      }
    );
  };

  function request() {
    return { type: CourseConstants.GETALL_REQUEST };
  }
  function success(courses) {
    return { type: CourseConstants.GETALL_SUCCESS, courses };
  }
  function failure(error) {
    return { type: CourseConstants.GETALL_FAILURE, error };
  }
}

export default CourseActions;
