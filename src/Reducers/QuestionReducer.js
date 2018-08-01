import { isNumber } from 'util';

import QuestionConstants from '../Constants/QuestionConstants';
import UserConstants from '../Constants/UserConstants';
import OptionConstants from '../Constants/OptionConstants';

function filterById(id, delId) {
  if (isNumber(id) && id !== 0 && id !== delId) {
    return true;
  }
  return false;
}

function findIndex(state, obj) {
  let id = 0;
  let position = 0;
  state.map((object) => {
    if (object.id === obj.id) {
      /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
      id = position;
    }
    position += 1;
    return position;
  });
  return id;
}

function QuestionReducer(state = {}, action) {
  switch (action.type) {
    case QuestionConstants.CREATE_REQUEST:
      return Object.assign({}, state, {
        question: action.QuestionName,
        creating: true,
      });
    case QuestionConstants.CREATE_SUCCESS:
      return Object.assign({}, state, {
        question: action.questionResponse,
        creating: false,
      });
    case QuestionConstants.CREATE_FAILURE:
      return Object.assign({}, state, {
        question: {},
        creating: false,
      });
    case QuestionConstants.GETALL_REQUEST:
      return Object.assign({}, state, {
        questions: [],
        loading: true,
      });
    case QuestionConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        questions: action.questions,
        loading: false,
      });
    case QuestionConstants.GETALL_FAILURE:
      return Object.assign({}, state, {
        questions: [],
        loading: false,
      });
    case QuestionConstants.LOADQUESTIONS_REQUEST:
      return Object.assign({}, state, {
        questions: [],
        loading: true,
      });
    case QuestionConstants.LOADQUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        questions: action.questions,
        loading: false,
      });
    case QuestionConstants.LOADQUESTIONS_FAILURE:
      return Object.assign({}, state, {
        questions: [],
        loading: false,
      });
    case QuestionConstants.GETBYID_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case QuestionConstants.GETBYID_SUCCESS:
      return Object.assign({}, state, {
        question: action.question,
      });
    case QuestionConstants.GETBYID_FAILURE:
      return Object.assign({}, state, {
        question: {},
      });
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
    case QuestionConstants.OPTIONS_REQUEST:
      return Object.assign({}, state, {
        question: action.obj,
        loading: true,
      });
    case QuestionConstants.OPTIONS_SUCCESS:
      return Object.assign({}, state, {
        options: action.questionOptions,
      });
    case QuestionConstants.OPTIONS_FAILURE:
      return Object.assign({}, state, {
        question: {},
        options: {},
      });
    case QuestionConstants.OPTIONS_ISANSWER_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case QuestionConstants.OPTIONS_ISANSWER_SUCCESS:
      return Object.assign({}, state, {
        options: {
          ...Object.values(state.options),
          [findIndex(Object.values(state.options), action.values)]: {
            ...action.values,
            isAnswer: !action.values.isAnswer,
          },
        },
      });
    case QuestionConstants.OPTIONS_ISANSWER_FAILURE:
      return state;
    case QuestionConstants.DELETE_QO_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case QuestionConstants.DELETE_QO_SUCCESS:
      return Object.assign({}, state, {
        options: state.options.filter(obj => filterById(obj.id, action.id)),
        loading: false,
      });
    case QuestionConstants.DELETE_QO_FAILURE:
      return state;
    case OptionConstants.CREATE_REQUEST:
      return state;
    case OptionConstants.CREATE_SUCCESS:
      return Object.assign({}, state, {
        options: state.options
          ? state.options.concat(action.option)
          : [action.option],
      });
    case OptionConstants.CREATE_FAILURE:
      return state;
    case UserConstants.LOGOUT:
      return {
        question: {},
        questions: [],
      };
    case QuestionConstants.CLEAR_QUESTION:
      return {
        question: {},
        questions: [],
      };
    default:
      return state;
  }
}

export default QuestionReducer;
