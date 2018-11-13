import TestConstants from '../Constants/TestConstants';
import ModuleConstants from '../Constants/ModuleConstants';
import CourseConstants from '../Constants/CourseConstants';
import TestService from '../Services/TestService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(moduleID, testName, totalMarks) {
  function request() {
    return { type: TestConstants.CREATE_REQUEST, testName };
  }
  function success(newTestId) {
    return { type: TestConstants.CREATE_SUCCESS, testName, newTestId };
  }
  function failure(error) {
    return { type: TestConstants.CREATE_FAILURE, error };
  }
  function openmodal_request() {
    return { type: TestConstants.OPENREDIRECTMODAL_REQUEST };
  }
  function course_success(newCourseId) {
    return { type: CourseConstants.CREATE_SUCCESS, newCourseId };
  }
  function module_success(newModuleId) {
    return { type: ModuleConstants.CREATE_SUCCESS, newModuleId };
  }

  return (dispatch) => {
    dispatch(request({ testName }));
    TestService.create(moduleID, testName, totalMarks).then(
      (test) => {
        console.log('test', test);
        dispatch(success(test.id));
        dispatch(course_success(test.module.courseId));
        dispatch(module_success(test.moduleId));
        dispatch(openmodal_request());
        // dispatch(AlertActions.success(`Test ${testName} created.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function closeRedirectModal() {
  function request() {
    return { type: TestConstants.CLOSEREDIRECTMODAL_REQUEST };
  }

  return (dispatch) => {
    dispatch(request());
  };
}

function getAll() {
  function request() {
    return { type: TestConstants.GETALL_REQUEST };
  }
  function success(tests) {
    return { type: TestConstants.GETALL_SUCCESS, tests };
  }
  function failure(error) {
    return { type: TestConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    TestService.getAll().then(
      tests => dispatch(success(tests)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function loadTest(id) {
  function request() {
    return { type: TestConstants.LOAD_TEST_REQUEST };
  }
  function success(test) {
    return { type: TestConstants.LOAD_TEST_SUCCESS, test };
  }
  function failure(error) {
    return { type: TestConstants.LOAD_TEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    TestService.loadTest(id).then(
      test => dispatch(success(test)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function loadTestQuestions(userId, id) {
  function request() {
    return { type: TestConstants.LOAD_TEST_QUESTIONS_REQUEST };
  }
  function success(questions) {
    return { type: TestConstants.LOAD_TEST_QUESTIONS_SUCCESS, questions };
  }
  function failure(error) {
    return { type: TestConstants.LOAD_TEST_QUESTIONS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    TestService.loadTestQuestions(userId, id).then(
      questions => dispatch(success(questions)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function markQuestion(id, answerId) {
  const payload = { id, answerId };

  function request() {
    return { type: TestConstants.MARK_TEST_QUESTION_REQUEST };
  }
  function success() {
    return { type: TestConstants.MARK_TEST_QUESTION_SUCCESS, payload };
  }
  function failure(error) {
    return { type: TestConstants.MARK_TEST_QUESTION_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    TestService.markQuestion(id, answerId).then(dispatch(success()), (error) => {
      dispatch(failure(error));
      dispatch(AlertActions.error(error));
    });
  };
}

function loadTestQuestion(question) {
  function success() {
    return { type: TestConstants.LOAD_QUESTION_SUCCESS, question };
  }

  return (dispatch) => {
    dispatch(success(question));
  };
}

function changeAnswer(value) {
  function success() {
    return { type: TestConstants.CHANGE_ANSWER, value };
  }

  return (dispatch) => {
    dispatch(success(value));
  };
}

function loadNextQuestion(question) {
  function success() {
    return { type: TestConstants.LOAD_QUESTION_SUCCESS, question };
  }

  return (dispatch) => {
    dispatch(success(question));
  };
}

function submitTest(testId, courseId, userId) {
  function request() {
    return { type: TestConstants.SUBMIT_TEST_REQUEST };
  }
  function success() {
    return { type: TestConstants.SUBMIT_TEST_SUCCESS };
  }
  function failure(error) {
    return { type: TestConstants.SUBMIT_TEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    TestService.submitTest(testId, courseId, userId).then(
      dispatch(success()),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function enrolmentTest(testId, courseId, userId) {
  function request() {
    return { type: TestConstants.BEGIN_TEST_REQUEST };
  }
  function success() {
    return { type: TestConstants.BEGIN_TEST_SUCCESS };
  }
  function failure(error) {
    return { type: TestConstants.BEGIN_TEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    TestService.enrolmentTest(testId, courseId, userId).then(
      dispatch(success()),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function editTest(values) {
  function request() {
    return { type: TestConstants.EDIT_TEST_REQUEST };
  }
  function success() {
    return { type: TestConstants.EDIT_TEST_SUCCESS };
  }
  function failure(error) {
    return { type: TestConstants.EDIT_TEST_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request());
    TestService.editTest(values).then(
      () => {
        history.push('/assessment/list');
        dispatch(success());
        dispatch(AlertActions.success(`Test: ${values.name} edited.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function loadTestByModule(id) {
  function request() {
    return { type: TestConstants.LOADTEST_REQUEST };
  }
  function success(tests) {
    return { type: TestConstants.LOADTEST_SUCCESS, tests };
  }
  function failure(error) {
    return { type: TestConstants.LOADTEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    TestService.getTests(id).then(
      tests => dispatch(success(tests)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function clearTests() {
  function clear() {
    return { type: TestConstants.CLEAR_TESTS };
  }
  return (dispatch) => {
    dispatch(clear());
  };
}

function deleteTest(id) {
  function request() {
    return { type: TestConstants.DELETE_TEST_REQUEST };
  }
  function success() {
    return { type: TestConstants.DELETE_TEST_SUCCESS };
  }
  function failure(error) {
    return { type: TestConstants.DELETE_TEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    TestService.deleteTest(id).then(
      () => dispatch(success()),
      dispatch(AlertActions.success('Module deleted successfully.')),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

const TestActions = {
  create,
  closeRedirectModal,
  getAll,
  loadTest,
  loadTestQuestions,
  markQuestion,
  changeAnswer,
  loadTestQuestion,
  loadNextQuestion,
  submitTest,
  editTest,
  clearTests,
  loadTestByModule,
  enrolmentTest,
  deleteTest,
};

export default TestActions;
