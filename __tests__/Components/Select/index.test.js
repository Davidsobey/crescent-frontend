import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import Select from '../../../src/Components/Select/index.js';


const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe('<Select />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Select store={store} label="Course Name" input={{name:"courseId"}} meta={{touched:false}}  />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});