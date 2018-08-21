import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UsersPolicyDetails from '../../../../../src/Containers/Policy/Acknowledgement/Detail/index.js';


const mockStore = configureStore();
const initialState = {
  PolicyReducer:{
    policyMaterials: [],
    policyMaterials_loading: false,
    policyId: 1,
    policyName: 'name',
    policyDescription: 'description',
    canAcknowlege: true,
    acknowledging: false,
  },
  LoginReducer:{
    user: {},
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