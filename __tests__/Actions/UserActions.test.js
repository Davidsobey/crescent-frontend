import configureStore from 'redux-mock-store';

// Actions to be tested
import UserActions from '../../src/Actions/UserActions';

const mockStore = configureStore();
const store = mockStore();

describe('UserActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});