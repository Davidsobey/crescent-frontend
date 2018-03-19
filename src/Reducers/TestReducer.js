import TestConstants, {
  questionsObj,
  question,
} from '../Constants/TestConstants';

function TestReducer(state = {}, action) {
  switch (action.type) {
    case TestConstants.CREATE_REQUEST:
      return {
        ...state,
        test: action.testName,
      };
    case TestConstants.CREATE_SUCCESS:
      return {
        ...state,
        test: action.testName,
      };
    case TestConstants.CREATE_FAILURE:
      return { ...state };

    case TestConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TestConstants.GETALL_SUCCESS:
      return { ...state, tests: action.tests };
    case TestConstants.GETALL_FAILURE:
      return {
        ...state,
        modules: {},
      };
    case TestConstants.LOADTEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TestConstants.LOADTEST_SUCCESS:
      return {
        ...state,
        test: action.test,
      };
    case TestConstants.LOADTEST_FAILURE:
      return {
        ...state,
        modules: {},
      };

    case TestConstants.LOADTESTQUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TestConstants.LOADTESTQUESTIONS_SUCCESS:
      return { ...state, questions: action.questions };
    case TestConstants.LOADTESTQUESTIONS_FAILURE:
      return {
        ...state,
        modules: {},
      };

    case TestConstants.MARKTESTQUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TestConstants.MARKTESTQUESTION_SUCCESS:
      return { ...state, response: 'Question Marked', loading: false };
    case TestConstants.MARKTESTQUESTION_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case TestConstants.LOADQUESTION_SUCCESS:
      return {
        ...state,
        question: action.question,
      };
    case TestConstants.LOADQUESTION_SUCCES:
      return {
        ...state,
        questions: questionsObj,
      };
    case TestConstants.LOADQUESTION_SUCCE:
      return {
        ...state,
        question,
      };
    default:
      return state;
  }
}

export default TestReducer;
