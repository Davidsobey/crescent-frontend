import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ClientCreate from '../../../../src/Containers/Client/ClientCreate/index.js';


const mockStore = configureStore();
const initialState = {
  ClientReducer:{
    creating: false,
  }
};
const store = mockStore(initialState);

describe('<ClientCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ClientCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});