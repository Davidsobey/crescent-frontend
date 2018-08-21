import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ChangePassword from '../../../src/Containers/ChangePassword/index.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    loading: false,
  },
};
const store = mockStore(initialState);

describe('<ChangePassword />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ChangePassword store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});