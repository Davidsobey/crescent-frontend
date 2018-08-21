import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import EnrolmentCreate from '../../../../src/Containers/User/UserEnrol/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    courses: [],
    loading: false,
    subscribedCourses: [],
    subscribedCourses_loading: false,
    newCourseId: 1,
  },
  ClientReducer:{
    userEnrolments: [],
    loading: false,
  },
  UserReducer:{
    users: [],
    loading: false,
    enrolling: false,
  },
  LoginReducer:{
    user: {},
  }
};
const store = mockStore(initialState);

describe('<EnrolmentCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<EnrolmentCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});