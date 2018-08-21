import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import UserEdit from '../../../../src/Containers/User/UserEdit/index.js';


const mockStore = configureStore();
const initialState = {
  ClientReducer:{
    clients: [],
    loading: false,
  },
  UserReducer:{
    user: null,
    roles: [],
    loading: false,
    user_loading: false,
    user_editing: false,
  }
};
const store = mockStore(initialState);

describe('<UserEdit />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<UserEdit store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});