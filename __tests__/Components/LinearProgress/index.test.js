import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import LinearProgress from '../../../src/Components/LinearProgress/index.js';


const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe('<LinearProgress />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<LinearProgress store={store} color="#000" />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});