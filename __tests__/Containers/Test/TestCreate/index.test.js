import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import TestCreate from '../../../../src/Containers/Test/TestCreate/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    courses: [],
    loading: false,
    newCourseId: 1,
  },
  ModuleReducer:{
    modules: [],
    loading: false,
    newModuleId: 1,
  },
  TestReducer:{
    tests: [],
    loading: false,
    creating: false,
    openRedirectModal: false,
  },
};
const store = mockStore(initialState);

describe('<TestCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<TestCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});