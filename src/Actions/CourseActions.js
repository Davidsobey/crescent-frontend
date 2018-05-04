import CourseConstants from '../Constants/CourseConstants';
import CourseService from '../Services/CourseService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(values) {
  function request() {
    return { type: CourseConstants.CREATE_REQUEST };
  }
  function success() {
    return { type: CourseConstants.CREATE_SUCCESS };
  }
  function failure(error) {
    return { type: CourseConstants.CREATE_FAILURE, error };
  }
  const { courseName, courseDescription, courseCPD } = values;

  return (dispatch) => {
    dispatch(request({ courseName }));
    CourseService.create(courseName, courseDescription, courseCPD).then(
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

function deleteCourse(id) {
  function request() {
    return { type: CourseConstants.DELETE_REQUEST, id };
  }
  function success() {
    return { type: CourseConstants.DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: CourseConstants.DELETE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    CourseService.deleteCourse(id).then(
      () => {
        dispatch(success(id));
        dispatch(AlertActions.success('Course deleted.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function loadCourse(id) {
  function request() {
    return { type: CourseConstants.LOADCOURSE_REQUEST };
  }
  function success(course) {
    return { type: CourseConstants.LOADCOURSE_SUCCESS, course };
  }
  function failure(error) {
    return { type: CourseConstants.LOADCOURSE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    CourseService.getCourse(id).then(
      (course) => {
        dispatch(success(course));
        history.push('/course/edit');
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function editCourse(values) {
  return (dispatch) => {
    CourseService.editCourse(values).then(
      () => {
        history.push('/course/list');
        dispatch(AlertActions.success(`Course ${values.name} edited.`));
      },
      (error) => {
        dispatch(AlertActions.error(error));
      },
    );
  };
}

const CourseActions = {
  create,
  getAll,
  loadCourse,
  deleteCourse,
  editCourse,
};

export default CourseActions;
