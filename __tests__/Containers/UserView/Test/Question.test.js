import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UserTestQuestion from '../../../../src/Containers/UserView/Test/index.js';


const mockStore = configureStore();
const initialState = {
  TestReducer:{
    test: {},
  },
  LoginReducer:{
    user: { },
  },
  CourseReducer:{
    course: {},
  },
};
const store = mockStore(initialState);

describe('<UserTestQuestion />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<UserTestQuestion store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});