import configureStore from 'redux-mock-store';

// Actions to be tested
import AlertActions from '../../src/Actions/AlertActions';

const mockStore = configureStore();
const store = mockStore();

describe('AlertActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});