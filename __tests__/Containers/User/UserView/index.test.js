import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UserView from '../../../../src/Containers/User/UserView/index.js';


const mockStore = configureStore();
const initialState = {
  LoginReducer:{
    user: {},
  },
  UserReducer:{
    users: [],
    loading: false,
  }
};
const store = mockStore(initialState);

describe('<UserView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<UserView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});