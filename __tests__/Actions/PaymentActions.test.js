import configureStore from 'redux-mock-store';

// Actions to be tested
import PaymentActions from '../../src/Actions/PaymentActions';

const mockStore = configureStore();
const store = mockStore();

describe('PaymentActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});