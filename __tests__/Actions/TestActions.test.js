import configureStore from 'redux-mock-store';

// Actions to be tested
import TestActions from '../../src/Actions/TestActions';

const mockStore = configureStore();
const store = mockStore();

describe('TestActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});