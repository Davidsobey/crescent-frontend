import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be Questioned
import QuestionEdit from '../../../../src/Containers/Question/QuestionEdit/index.js';


const mockStore = configureStore();
const initialState = {
  TestReducer:{
    tests: [],
    loading: false,
  },
  QuestionReducer:{
    question: null,
    question_loading: false,
    question_editing: false,
  }
};
const store = mockStore(initialState);

describe('<QuestionEdit />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<QuestionEdit store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});