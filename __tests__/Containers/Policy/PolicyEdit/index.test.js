import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import PolicyEdit from '../../../../src/Containers/Policy/PolicyEdit/index.js';


const mockStore = configureStore();
const initialState = {
  PolicyReducer:{
    policy: null,
    policy_loading: false,
    policy_editing: false,
  }
};
const store = mockStore(initialState);

describe('<PolicyEdit />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<PolicyEdit store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});