import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import MaterialCreate from '../../../../../src/Containers/Module/Material/MaterialCreate/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    unsubscribed_courses: [],
    unsubscribed_courses_loading: false,
    newCourseId: 1,
  },
  ModuleReducer:{
    modules: [],
    loading: false,
    newModuleId: false,
    uploading: false,
    openRedirectModal: false,
  },
  ClientReducer:{
    subscribing: false,
  },
  LoginReducer:{
    user: {}
  },
};
const store = mockStore(initialState);

describe('<ModuleMaterialCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<MaterialCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});