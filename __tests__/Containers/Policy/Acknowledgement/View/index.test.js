import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import PolicyAcknowledgementView from '../../../../../src/Containers/Policy/Acknowledgement/View/index.js';


const mockStore = configureStore();
const initialState = {
  PolicyReducer:{
    policyAcknowledgements: [],
    loading: false,
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

describe('<PolicyAcknowledgementView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<PolicyAcknowledgementView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});