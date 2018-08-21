import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ModulesComponent from '../../../../src/Containers/UserView/Modules/index.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    user: {},
  },
};
const store = mockStore(initialState);

describe('<ModulesComponent />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ModulesComponent store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});