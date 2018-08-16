import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ClientEdit from '../../../../src/Containers/Client/ClientEdit/index.js';


const mockStore = configureStore();
const initialState = {
  ClientReducer:{
    client: null,
    creating: false,
    client_editing: false,
  }
};
const store = mockStore(initialState);

describe('<ClientEdit />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ClientEdit store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});