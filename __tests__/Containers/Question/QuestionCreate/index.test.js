import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be Questioned
import QuestionCreate from '../../../../src/Containers/Question/QuestionCreate/index.js';


const mockStore = configureStore();
const initialState = {
  CourseReducer:{
    courses: [],
    loading: false,
    newCourseId: 1,
  },
  ModuleReducer:{
    modules: [],
    loading: false,
    newModuleId: 1,
  },
  TestReducer:{
    tests: [],
    loading: false,
    newTestId: false,
  },
  QuestionReducer:{
    questions: [],
    loading: false,
    creating: false,
  },
};
const store = mockStore(initialState);

describe('<QuestionCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<QuestionCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});