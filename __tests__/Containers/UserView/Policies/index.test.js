import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UsersPolicyView from '../../../../src/Containers/UserView/Policies/index.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    user: {},
  },
  PolicyReducer:{
    policyAcknowledgements: [],
    loading: false,
  },
};
const store = mockStore(initialState);

describe('<UsersPolicyView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<UsersPolicyView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});