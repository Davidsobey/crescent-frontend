import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import OptionsModal from '../../../src/Components/OptionsModal/index.js';


const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

const options = [
  // {label: 'Create another assessment'},
  {label: 'Create another module', url: '/module/create'},
  {label: 'Create questions for this assessment', url: '/question/create'},
];

describe('<OptionsModal />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<OptionsModal store={store} options={options} open={false} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});