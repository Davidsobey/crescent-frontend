import CourseConstants from '../Constants/CourseConstants';
import CourseService from '../Services/CourseService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(values) {
  function request() {
    return { type: CourseConstants.CREATE_REQUEST };
  }
  function success(newCourseId) {
    return { type: CourseConstants.CREATE_SUCCESS, newCourseId };
  }
  function failure(error) {
    return { type: CourseConstants.CREATE_FAILURE, error };
  }
  const { courseName, courseDescription, courseCPD } = values;

  return (dispatch) => {
    dispatch(request({ courseName }));
    CourseService.create(courseName, courseDescription, courseCPD).then(
      (course) => {
        dispatch(success(course.id));
        history.push('/module/create');
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

function getAllUnsubscribed(clientId) {
  function request() {
    return { type: CourseConstants.GETUNSUBSCRIBED_REQUEST };
  }
  function success(courses) {
    return { type: CourseConstants.GETUNSUBSCRIBED_SUCCESS, courses };
  }
  function failure(error) {
    return { type: CourseConstants.GETUNSUBSCRIBED_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    CourseService.getAllUnsubscribedCourses(clientId).then(
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
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function clearCourses() {
  function clear() {
    return { type: CourseConstants.CLEAR_COURSES };
  }
  return (dispatch) => {
    dispatch(clear());
  };
}

function editCourse(values) {
  function request() {
    return { type: CourseConstants.EDIT_REQUEST };
  }
  function success() {
    return { type: CourseConstants.EDIT_SUCCESS };
  }
  function failure(error) {
    return { type: CourseConstants.EDIT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    CourseService.editCourse(values).then(
      () => {
        history.push('/course/list');
        dispatch(success());
        dispatch(AlertActions.success(`Course ${values.name} edited.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function loadCoursesByClientSubscriptions(clientId) {
  function request() {
    return { type: CourseConstants.LOADCOURSES_REQUEST };
  }
  function success(courses) {
    return { type: CourseConstants.LOADCOURSES_SUCCESS, courses };
  }
  function failure(error) {
    return { type: CourseConstants.LOADCOURSES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    CourseService.getAllSubscribedCourses(clientId).then(
      courses => dispatch(success(courses)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
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
  getAllUnsubscribed,
  loadCoursesByClientSubscriptions,
  clearCourses,
};

export default CourseActions;
