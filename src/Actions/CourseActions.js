import CourseConstants from '../Constants/CourseConstants';
import CourseService from '../Services/CourseService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(courseName, courseDescription) {
  function request() {
    return { type: CourseConstants.CREATE_REQUEST, courseName };
  }
  function success() {
    return { type: CourseConstants.CREATE_SUCCESS, courseName };
  }
  function failure(error) {
    return { type: CourseConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ courseName }));
    CourseService.create(courseName, courseDescription).then(
      () => {
        dispatch(success(courseName));
        history.push('/course/list');
        dispatch(AlertActions.success(`Course ${courseName} created.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getAll() {
  function request() {
    return { type: CourseConstants.GETALL_REQUEST };
  }
  function success(courses) {
    return { type: CourseConstants.GETALL_SUCCESS, courses };
  }
  function failure(error) {
    return { type: CourseConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    CourseService.getAll().then(
      courses => dispatch(success(courses)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

const CourseActions = {
  create,
  getAll,
};

export default CourseActions;
