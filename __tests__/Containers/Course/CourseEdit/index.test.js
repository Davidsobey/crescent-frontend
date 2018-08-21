import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import CourseEdit from '../../../../src/Containers/Course/CourseEdit/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    course: null,
    course_loading: false,
    course_editing: false,
  }
};
const store = mockStore(initialState);

describe('<CourseEdit />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<CourseEdit store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});