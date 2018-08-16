import configureStore from 'redux-mock-store';

// Actions to be tested
import ClientActions from '../../src/Actions/ClientActions';

const mockStore = configureStore();
const store = mockStore();

describe('ClientActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});