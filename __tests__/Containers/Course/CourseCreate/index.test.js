import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import CourseCreate from '../../../../src/Containers/Course/CourseCreate/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    courses: [],
    loading: false,
    creating: false,
  },
};
const store = mockStore(initialState);

describe('<CourseCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<CourseCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});