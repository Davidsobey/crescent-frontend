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
    return { type: TestConstants.LOADTEST_REQUEST };
  }
  function success(test) {
    return { type: TestConstants.LOADTEST_SUCCESS, test };
  }
  function failure(error) {
    return { type: TestConstants.LOADTEST_FAILURE, error };
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
    return { type: TestConstants.LOADTESTQUESTIONS_REQUEST };
  }
  function success(questions) {
    return { type: TestConstants.LOADTESTQUESTIONS_SUCCESS, questions };
  }
  function failure(error) {
    return { type: TestConstants.LOADTESTQUESTIONS_FAILURE, error };
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

const TestActions = {
  create,
  getAll,
  loadTest,
  loadTestQuestions,
};

export default TestActions;
