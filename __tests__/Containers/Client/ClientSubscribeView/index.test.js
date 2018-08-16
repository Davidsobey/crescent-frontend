import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ClientSubscribeView from '../../../../src/Containers/Client/ClientSubscribeView/index.js';


const mockStore = configureStore();
const initialState = {
  ClientReducer:{
    userEnrolments: [],
    loading: false,
  },
  CourseReducer:{
    subscribedCourses: [],
    subscribedCourses_loading: false,
  },
  LoginReducer: {
    user: {
      name: 'aaa',
    }
  },
};
const store = mockStore(initialState);

describe('<ClientSubscribeView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ClientSubscribeView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});