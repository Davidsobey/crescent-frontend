import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ClientView from '../../../../src/Containers/Client/ClientView/index.js';


const mockStore = configureStore();
const initialState = {
  ClientReducer:{
    clients: [],
    loading: false,
  }
};
const store = mockStore(initialState);

describe('<ClientView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ClientView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});