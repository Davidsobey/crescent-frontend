import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import MaterialCreate from '../../../../../src/Containers/Policy/Material/Create/index.js';


const mockStore = configureStore();
const initialState = {
  PolicyReducer:{
    policies: [],
    loading: false,
    newPolicyId: 1,
    creating: false,
  },
};
const store = mockStore(initialState);

describe('<PolicyMaterialCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<MaterialCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});