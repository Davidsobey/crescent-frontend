import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UserEnrolView from '../../../../src/Containers/User/UserEnrolView/index.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    user: {},
  },
  UserReducer:{
    users: [],
    loading: false,
  },
  CourseReducer:{
    courses: [],
    loading: false,
  },
  ClientReducer:{
    userEnrolments: [],
    loading: false,
  },
};
const store = mockStore(initialState);

describe('<UserEnrolView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<UserEnrolView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});