import { isNumber } from 'util';

import QuestionConstants from '../Constants/QuestionConstants';
import UserConstants from '../Constants/UserConstants';

function filterById(id, delId) {
  if (isNumber(id) && id !== 0 && id !== delId) {
    return true;
  }
  return false;
}

function QuestionReducer(state = {}, action) {
  switch (action.type) {
    case QuestionConstants.CREATE_REQUEST:
      return {
        question: action.QuestionName,
      };
    case QuestionConstants.CREATE_SUCCESS:
      return {
        question: action.QuestionName,
        loading: true,
      };
    case QuestionConstants.CREATE_FAILURE:
      return {};
    case QuestionConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case QuestionConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        questions: action.questions,
      });
    case QuestionConstants.GETALL_FAILURE:
      return {
        questions: {},
      };
    case QuestionConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case QuestionConstants.GETBYID_SUCCESS:
      return Object.assign({}, state, {
        question: action.question,
      });
    case QuestionConstants.GETBYID_FAILURE:
      return {
        question: {},
      };
    case QuestionConstants.DELETE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case QuestionConstants.DELETE_SUCCESS:
      return Object.assign({}, state, {
        questions: state.questions.filter(obj => filterById(obj.id, action.id)),
        loading: false,
      });
    case QuestionConstants.DELETE_FAILURE:
      return state;
    case UserConstants.LOGOUT:
      return {};
    case QuestionConstants.CLEAR_QUESTION:
      return {
        question: {},
      };
    default:
      return state;
  }
}

export default QuestionReducer;
