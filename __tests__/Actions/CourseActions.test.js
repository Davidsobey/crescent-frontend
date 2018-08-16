import configureStore from 'redux-mock-store';

// Actions to be tested
import CourseActions from '../../src/Actions/CourseActions';

const mockStore = configureStore();
const store = mockStore();

describe('CourseActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

});