import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import TestView from '../../../../src/Containers/Test/TestView/index.js';


const mockStore = configureStore();
const initialState = {
  ModuleReducer:{
    modules: [],
    loading: false,
  },
  TestReducer:{
    tests: [],
    loading: false,
  }
};
const store = mockStore(initialState);

describe('<TestView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<TestView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});