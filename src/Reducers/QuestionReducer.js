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
        questionCreated: true,
        creating: false,
        options: [],
        questionCreated: false,
        options_loading: false,
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
        creating: false,
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
      return {
        question_loading: true,
      };
    case QuestionConstants.GETBYID_SUCCESS:
      return Object.assign({}, state, {
        question: action.question,
        question_loading: false,
      });
    case QuestionConstants.GETBYID_FAILURE:
      return {
        error: action.error,
        question_loading: false,
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
    case QuestionConstants.OPTIONS_REQUEST:
      return Object.assign({}, state, {
        question: action.obj,
        options_loading: true,
        option_creating: false,
      });
    case QuestionConstants.OPTIONS_SUCCESS:
      return Object.assign({}, state, {
        options: action.questionOptions,
        questionCreated: false,
        options_loading: false,
      });
    case QuestionConstants.OPTIONS_FAILURE:
      return Object.assign({}, state, {
        question: {},
        options: {},
        options_loading: false,
      });
    case QuestionConstants.OPTIONS_ISANSWER_REQUEST:
      return Object.assign({}, state, {
        options_loading: true,
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
        options_loading: false,
      });
    case QuestionConstants.OPTIONS_ISANSWER_FAILURE:
      return Object.assign({}, state, {
        options_loading: false,
      });
    case QuestionConstants.DELETE_QO_REQUEST:
      return Object.assign({}, state, {
        options_loading: true,
      });
    case QuestionConstants.DELETE_QO_SUCCESS:
      return Object.assign({}, state, {
        options: state.options.filter(obj => filterById(obj.id, action.id)),
        options_loading: false,
      });
    case QuestionConstants.DELETE_QO_FAILURE:
      return Object.assign({}, state, {
        options_loading: false,
      });
    case OptionConstants.CREATE_REQUEST:
      return Object.assign({}, state, {
        option_creating: true,
      });
    case OptionConstants.CREATE_SUCCESS:
      return Object.assign({}, state, {
        options: state.options
          ? state.options.concat(action.option)
          : [action.option],
        option_creating: false,
      });
    case OptionConstants.CREATE_FAILURE:
      return Object.assign({}, state, {
        option_creating: false,
      });
    case OptionConstants.UPDATE_REQUEST:
      return Object.assign({}, state, {
        option_updating: true,
      });
    case OptionConstants.UPDATE_SUCCESS:
      let options_array = Array.isArray(state.options) ? state.options : [state.options];
      let options_updated = [];
      options_array.forEach(option => {
        options_updated.push((option.id == action.option.id) ? Object.assign({}, option, {
          title: action.option.title,
          isAnswer: action.option.isAnswer,
        }) : option);
      });
      return Object.assign({}, state, {
        options: options_updated,
        option_updating: false,
      });
    case OptionConstants.UPDATE_FAILURE:
      return Object.assign({}, state, {
        option_updating: false,
      });
    case QuestionConstants.EDIT_QUESTION_REQUEST:
      return Object.assign({}, state, {
        question_editing: true,
      });
    case QuestionConstants.EDIT_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        question: undefined,
        question_editing: false,
      });
    case QuestionConstants.EDIT_QUESTION_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        question_editing: false,
      });
    case QuestionConstants.SET_OPTION_EDITING:
      return Object.assign({}, state, {
        option_editing: action.option_editing,
      });
    case UserConstants.LOGOUT:
      return {};
    case QuestionConstants.CLEAR_QUESTION:
      return {};
    default:
      return state;
  }
}

export default QuestionReducer;
