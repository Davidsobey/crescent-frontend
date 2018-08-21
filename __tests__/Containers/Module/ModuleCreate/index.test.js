import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ModuleCreate from '../../../../src/Containers/Module/ModuleCreate/index.js';


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
    creating: false,
  },
};
const store = mockStore(initialState);

describe('<ModuleCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ModuleCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});