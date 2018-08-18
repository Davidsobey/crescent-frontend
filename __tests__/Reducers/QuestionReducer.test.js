// Reducer to be tested
import QuestionReducer from '../../src/Reducers/QuestionReducer';
import QuestionConstants from '../../src/Constants/QuestionConstants';

describe('QuestionReducer', () => {
  test('CREATE_SUCCESS', () => {
    const action = {
      type: QuestionConstants.CREATE_SUCCESS,
      questionResponse: {},
    };

    expect(QuestionReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETALL_SUCCESS', () => {
    const action = {
      type: QuestionConstants.GETALL_SUCCESS,
      questions: [],
    };

    expect(QuestionReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETBYID_SUCCESS', () => {
    const action = {
      type: QuestionConstants.GETBYID_SUCCESS,
      question: {id:1, name:'111'},
    };

    expect(QuestionReducer(undefined, action)).toMatchSnapshot();
  });

  test('LOADQUESTIONS_SUCCESS', () => {
    const action = {
      type: QuestionConstants.LOADQUESTIONS_SUCCESS,
      questions: [],
    };

    expect(QuestionReducer(undefined, action)).toMatchSnapshot();
  });

  test('DELETE_SUCCESS', () => {
    const action = {
      type: QuestionConstants.DELETE_SUCCESS,
      id: 1,
    };

    const state = {
      questions: []
    };

    expect(QuestionReducer(state, action)).toMatchSnapshot();
  });

  test('OPTIONS_SUCCESS', () => {
    const action = {
      type: QuestionConstants.OPTIONS_SUCCESS,
      questionOptions: [],
    };

    expect(QuestionReducer(undefined, action)).toMatchSnapshot();
  });

  test('OPTIONS_ISANSWER_SUCCESS', () => {
    const action = {
      type: QuestionConstants.OPTIONS_ISANSWER_SUCCESS,
      values: {isAnswer: false},
    };

    const state = {
      options: []
    };

    expect(QuestionReducer(state, action)).toMatchSnapshot();
  });

  test('DELETE_QO_SUCCESS', () => {
    const action = {
      type: QuestionConstants.DELETE_QO_SUCCESS,
      id: 1,
    };

    const state = {
      options: []
    };

    expect(QuestionReducer(state, action)).toMatchSnapshot();
  });

  test('EDIT_QUESTION_SUCCESS', () => {
    const action = {
      type: QuestionConstants.EDIT_QUESTION_SUCCESS,
    };

    expect(QuestionReducer(undefined, action)).toMatchSnapshot();
  });
});