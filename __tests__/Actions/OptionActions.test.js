import configureStore from 'redux-mock-store';

// Actions to be tested
import OptionActions from '../../src/Actions/OptionActions';

const mockStore = configureStore();
const store = mockStore();

describe('OptionActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});