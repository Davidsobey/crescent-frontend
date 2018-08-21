import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be Questioned
import QuestionView from '../../../../src/Containers/Question/QuestionView/index.js';


const mockStore = configureStore();
const initialState = {
  TestReducer:{
    tests: [],
    loading: false,
  },
  QuestionReducer:{
    questions: [],
    loading: false,
  }
};
const store = mockStore(initialState);

describe('<QuestionView />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<QuestionView store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});