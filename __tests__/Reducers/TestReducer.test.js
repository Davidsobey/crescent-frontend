// Reducer to be tested
import TestReducer from '../../src/Reducers/TestReducer';
import TestConstants from '../../src/Constants/TestConstants';

describe('TestReducer', () => {
  test('CREATE_SUCCESS', () => {
    const action = {
      type: TestConstants.CREATE_SUCCESS,
      testName: '111',
      newTestId: 1,
    };

    expect(TestReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETALL_SUCCESS', () => {
    const action = {
      type: TestConstants.GETALL_SUCCESS,
      tests: [],
    };

    expect(TestReducer(undefined, action)).toMatchSnapshot();
  });

  test('LOAD_TEST_SUCCESS', () => {
    const action = {
      type: TestConstants.LOAD_TEST_SUCCESS,
      test: {id:1, name:'111'},
    };

    expect(TestReducer(undefined, action)).toMatchSnapshot();
  });

  test('LOAD_TEST_QUESTIONS_SUCCESS', () => {
    const action = {
      type: TestConstants.LOAD_TEST_QUESTIONS_SUCCESS,
      questions: [],
    };

    expect(TestReducer(undefined, action)).toMatchSnapshot();
  });

  test('MARK_TEST_QUESTION_SUCCESS', () => {
    const action = {
      type: TestConstants.MARK_TEST_QUESTION_SUCCESS,
      payload: {id:1, answerId:1},
    };

    const state = {
      questions: [],
    };

    expect(TestReducer(state, action)).toMatchSnapshot();
  });

  test('SUBMIT_TEST_SUCCESS', () => {
    const action = {
      type: TestConstants.SUBMIT_TEST_SUCCESS,
    };

    expect(TestReducer(undefined, action)).toMatchSnapshot();
  });

  test('EDIT_TEST_SUCCESS', () => {
    const action = {
      type: TestConstants.EDIT_TEST_SUCCESS,
    };

    expect(TestReducer(undefined, action)).toMatchSnapshot();
  });

  test('LOADTEST_SUCCESS', () => {
    const action = {
      type: TestConstants.LOADTEST_SUCCESS,
      tests: [],
    };

    expect(TestReducer(undefined, action)).toMatchSnapshot();
  });
});