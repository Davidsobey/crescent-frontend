import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UserTest from '../../../../src/Containers/UserView/Test/index.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    user: {},
  },
  TestReducer:{
    test: {},
    questions: [],
  },
  CourseReducer:{
    course: {id: 1,},
  },
};
const store = mockStore(initialState);

describe('<UserTest />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<UserTest store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});