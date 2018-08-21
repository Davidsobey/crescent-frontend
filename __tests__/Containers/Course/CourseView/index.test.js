import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import CourseView from '../../../../src/Containers/Course/CourseView/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    courses: [],
    loading: false,
  }
};
const store = mockStore(initialState);

describe('<CourseView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<CourseView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});