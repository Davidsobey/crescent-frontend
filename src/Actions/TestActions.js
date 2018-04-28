import TestConstants from '../Constants/TestConstants';
import TestService from '../Services/TestService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(moduleID, testName, totalMarks) {
  function request() {
    return { type: TestConstants.CREATE_REQUEST, testName };
  }
  function success() {
    return { type: TestConstants.CREATE_SUCCESS, testName };
  }
  function failure(error) {
    return { type: TestConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ testName }));
    TestService.create(moduleID, testName, totalMarks).then(
      () => {
        dispatch(success(testName));
        history.push('/test/list');
        dispatch(AlertActions.success(`Test ${testName} created.`));
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

function EditTest(testObject) {
  function success() {
    return { type: TestConstants.LOAD_TEST_EDIT, testObject };
  }

  console.log(testObject);
  return (dispatch) => {
    dispatch(success(testObject));
  };
}

const TestActions = {
  create,
  getAll,
  loadTest,
  loadTestQuestions,
  markQuestion,
  changeAnswer,
  loadTestQuestion,
  loadNextQuestion,
  submitTest,
  EditTest,
};

export default TestActions;
