import TestConstants from '../Constants/TestConstants';

function TestReducer(state = {}, action) {
  switch (action.type) {
    case TestConstants.CREATE_REQUEST:
      return {
        test: action.testName,
      };
    case TestConstants.CREATE_SUCCESS:
      return {
        test: action.testName,
      };
    case TestConstants.CREATE_FAILURE:
      return {};
    case TestConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case TestConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        tests: action.tests,
      });
    case TestConstants.GETALL_FAILURE:
      return {
        modules: {},
      };
    default:
      return state;
  }
}

export default TestReducer;
