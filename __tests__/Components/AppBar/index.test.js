import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import AppBar from '../../../src/Components/AppBar/index.js';


const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe('<AppBar />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<AppBar store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});