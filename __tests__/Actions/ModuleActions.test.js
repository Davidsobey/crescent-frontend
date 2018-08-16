import configureStore from 'redux-mock-store';

// Actions to be tested
import ModuleActions from '../../src/Actions/ModuleActions';

const mockStore = configureStore();
const store = mockStore();

describe('ModuleActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});