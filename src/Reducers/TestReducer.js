import TestConstants from '../Constants/TestConstants';
import UserConstants from '../Constants/UserConstants';

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
        newTestId: action.newTestId
      };
    case TestConstants.CREATE_FAILURE:
      return { ...state };
    case TestConstants.OPENREDIRECTMODAL_REQUEST:
      return Object.assign({}, state, {
        openRedirectModal: true,
      });
    case TestConstants.CLOSEREDIRECTMODAL_REQUEST:
      return Object.assign({}, state, {
        openRedirectModal: false,
      });

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
        modules: undefined,
      };
    case TestConstants.LOAD_TEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TestConstants.LOAD_TEST_SUCCESS:
      return {
        ...state,
        test: action.test,
        loading: false,
      };
    case TestConstants.LOAD_TEST_FAILURE:
      return {
        ...state,
        test: {},
      };

    case TestConstants.LOAD_TEST_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TestConstants.LOAD_TEST_QUESTIONS_SUCCESS: {
      const ques = action.questions.sort((a, b) => a.id - b.id);
      return { ...state, questions: ques };
    }
    case TestConstants.LOAD_TEST_QUESTIONS_FAILURE:
      return {
        ...state,
        modules: undefined,
      };

    case TestConstants.MARK_TEST_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TestConstants.MARK_TEST_QUESTION_SUCCESS: {
      const newData = state.questions.map((ques) => {
        if (ques.questionId === action.payload.id) {
          return { ...ques, answerGivenId: action.payload.answerId };
        }
        return ques;
      });
      return { ...state, response: 'Question Marked', questions: newData };
    }
    case TestConstants.MARK_TEST_QUESTION_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case TestConstants.LOAD_QUESTION_SUCCESS:
      return {
        ...state,
        question: action.question,
      };
    case TestConstants.CHANGE_ANSWER:
      return {
        ...state,
        question: {
          ...state.question,
          answerGivenId: action.value,
        },
      };
    case TestConstants.SUBMIT_TEST_REQUEST:
      return {
        ...state,
      };
    case TestConstants.SUBMIT_TEST_SUCCESS:
      return {
        ...state,
      };
    case TestConstants.SUBMIT_TEST_FAILURE:
      return {
        ...state,
      };
    case UserConstants.LOGOUT:
      return {};
    case TestConstants.EDIT_TEST_SUCCESS:
      return { test: undefined };
    case TestConstants.LOADTEST_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case TestConstants.LOADTEST_SUCCESS:
      return Object.assign({}, state, {
        tests: action.tests,
        loading: false,
      });
    case TestConstants.LOADTEST_FAILURE:
      return {
        modules: undefined,
      };
    case TestConstants.CLEAR_TESTS:
      return {};
    default:
      return state;
  }
}

export default TestReducer;
