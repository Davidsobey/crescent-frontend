import configureStore from 'redux-mock-store';

// Actions to be tested
import QuestionActions from '../../src/Actions/QuestionActions';

const mockStore = configureStore();
const store = mockStore();

describe('QuestionActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});