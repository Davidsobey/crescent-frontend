import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ClientSubscribe from '../../../../src/Containers/Client/ClientSubscribe/index.js';


const mockStore = configureStore();
const initialState = {
  ClientReducer: {
    clients: [],
    loading: false,
    subscribing: false,
  },
  CourseReducer: {
    courses: [],
    loading: false,
    unsubscribed_courses: [],
    unsubscribed_courses_loading: false,
  },
  LoginReducer: {
    user: {
      name: 'aaa',
    }
  },
};
const store = mockStore(initialState);

describe('<ClientSubscribe />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ClientSubscribe store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});