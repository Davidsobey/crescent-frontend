import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UsersPolicyDetails from '../../../../src/Containers/UserView/Policies/PolicyDetail.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    user: {},
  },
  PolicyReducer:{
    policyMaterials: [],
    policyMaterials_loading: false,
    policyId: 1,
    acknowledging: false,
  },
};
const store = mockStore(initialState);

describe('<UsersPolicyDetails />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<UsersPolicyDetails store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});