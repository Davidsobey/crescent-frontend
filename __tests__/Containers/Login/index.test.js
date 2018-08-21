import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import Login from '../../../src/Containers/Login/index.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    loading: false,
  },
};
const store = mockStore(initialState);

describe('<Login />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Login store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});