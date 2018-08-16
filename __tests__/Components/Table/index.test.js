import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import Table from '../../../src/Components/Table/index.js';


const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

const header = ['Name', 'View Material'];
const data = [{'name':'aaa', 'button':''}];


describe('<Table />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Table store={store} header={header} data={data} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});