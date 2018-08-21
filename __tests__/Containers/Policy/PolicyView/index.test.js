import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import PolicyView from '../../../../src/Containers/Policy/PolicyView/index.js';


const mockStore = configureStore();
const initialState = {
  PolicyReducer:{
    policies: [],
    loading: false,
  }
};
const store = mockStore(initialState);

describe('<PolicyView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<PolicyView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});