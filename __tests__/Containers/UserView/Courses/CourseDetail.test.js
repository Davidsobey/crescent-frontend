import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import CourseDetail from '../../../../src/Containers/UserView/Courses/CourseDetail.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    course: {},
  },
  ModuleReducer:{
    modules: [],
    moduleMaterial: {},
    loading: false,
    moduleTests: [],
    loadingMaterial: false,
    loadingTests: false,
  },
};
const store = mockStore(initialState);

describe('<CourseDetail />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<CourseDetail store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});