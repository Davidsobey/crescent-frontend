import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ModuleEdit from '../../../../src/Containers/Module/ModuleEdit/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    courses: [],
    loading: false,
  },
  ModuleReducer:{
    module: null,
    module_loading: false,
    module_editing: false,
  }
};
const store = mockStore(initialState);

describe('<ModuleEdit />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ModuleEdit store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});