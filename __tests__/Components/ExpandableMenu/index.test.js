import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ExpandableMenu from '../../../src/Components/ExpandableMenu/index.js';

import AddIcon from 'material-ui-icons/Add';
import ListIcon from 'material-ui-icons/ViewList';
import CourseIcon from 'material-ui-icons/ChromeReaderMode';

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

const CourseDetails = {
  listName: 'Course',
  listIcon: <CourseIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Course',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Course List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

describe('<ExpandableMenu />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ExpandableMenu store={store} details={CourseDetails} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});