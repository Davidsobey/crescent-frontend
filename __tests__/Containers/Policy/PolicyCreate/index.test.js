import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import PolicyCreate from '../../../../src/Containers/Policy/PolicyCreate/index.js';


const mockStore = configureStore();
const initialState = {
  PolicyReducer:{
    creating: false,
  },
};
const store = mockStore(initialState);

describe('<PolicyCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<PolicyCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});