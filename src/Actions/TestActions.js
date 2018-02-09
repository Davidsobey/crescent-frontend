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

const TestActions = {
  create,
  getAll,
};

export default TestActions;
