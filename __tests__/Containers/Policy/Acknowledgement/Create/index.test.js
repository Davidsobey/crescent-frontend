import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import AcknowledgementCreate from '../../../../../src/Containers/Policy/Acknowledgement/Create/index.js';


const mockStore = configureStore();
const initialState = {
  PolicyReducer:{
    policies: [],
    loading: false,
    newPolicyId: 1,
    creating: false,
  },
  UserReducer:{
    users: [],
    loading: false,
  },
  LoginReducer:{
    user: {},
  },
};
const store = mockStore(initialState);

describe('<AcknowledgementCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<AcknowledgementCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});