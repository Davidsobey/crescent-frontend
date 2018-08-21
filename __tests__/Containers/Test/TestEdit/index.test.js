import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import TestEdit from '../../../../src/Containers/Test/TestEdit/index.js';


const mockStore = configureStore();
const initialState = {
  ModuleReducer:{
    modules: [],
    loading: false,
  },
  TestReducer:{
    test: null,
    test_loading: false,
    test_editing: false,
  }
};
const store = mockStore(initialState);

describe('<TestEdit />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<TestEdit store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});