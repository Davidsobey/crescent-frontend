import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ModuleDetail from '../../../../src/Containers/UserView/Modules/ModuleDetail.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    course: {},
  },
  ModuleReducer:{
    modules: [],
    modulematerial: {},
  },
};
const store = mockStore(initialState);

describe('<ModuleDetail />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ModuleDetail store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});