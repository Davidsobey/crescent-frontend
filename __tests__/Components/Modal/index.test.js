import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import Modal from '../../../src/Components/Modal/index.js';


const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe('<Modal />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const mockOnClick = jest.fn();
      const mockOnRef = jest.fn();
      const wrapper = shallow(<Modal store={store} onRef={mockOnRef} onClick={mockOnClick} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});