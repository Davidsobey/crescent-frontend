import configureStore from 'redux-mock-store';

// Actions to be tested
import PolicyActions from '../../src/Actions/PolicyActions';

const mockStore = configureStore();
const store = mockStore();

describe('PolicyActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});