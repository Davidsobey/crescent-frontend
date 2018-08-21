import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UserCreate from '../../../../src/Containers/User/UserCreate/index.js';


const mockStore = configureStore();
const initialState = {
  ClientReducer:{
    clients: [],
    loading: false,
    newClientId: 1,
    clientRoleId: 1,
  },
  UserReducer:{
    roles: [],
    loading: false,
    creating: false,
  },
  LoginReducer:{
    user: {},
  }
};
const store = mockStore(initialState);

describe('<UserCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<UserCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});