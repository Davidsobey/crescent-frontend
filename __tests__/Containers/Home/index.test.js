import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import HomeComponent from '../../../src/Containers/Home/index.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    user: false,
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
    subscriptions: [],
    subscriptions_loading: false,
  },
  PolicyReducer:{
    policyAcknowledgements: [],
    loading: false,
  },
  PaymentReducer:{
    paymentStatuses: [],
    loading: false,
  },
};
const store = mockStore(initialState);

describe('<HomeComponent />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<HomeComponent store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});