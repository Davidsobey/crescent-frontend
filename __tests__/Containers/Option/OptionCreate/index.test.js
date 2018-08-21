import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be Optioned
import OptionCreate from '../../../../src/Containers/Option/OptionCreate/index.js';


const mockStore = configureStore();
const initialState = {
  QuestionReducer:{
    question: {},
    options: [],
    options_loading: false,
    option_creating: false,
  },
};
const store = mockStore(initialState);

describe('<OptionCreate />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<OptionCreate store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});