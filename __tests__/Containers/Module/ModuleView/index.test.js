import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ModuleView from '../../../../src/Containers/Module/ModuleView/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    courses: [],
    loading: false,
  },
  ModuleReducer:{
    modules: [],
    loading: false,
  }
};
const store = mockStore(initialState);

describe('<ModuleView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ModuleView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});