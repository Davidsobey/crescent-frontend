// Reducer to be tested
import OptionReducer from '../../src/Reducers/OptionReducer';
import OptionConstants from '../../src/Constants/OptionConstants';

describe('OptionReducer', () => {
  test('GETALL_SUCCESS', () => {
    const action = { 
      type: OptionConstants.GETALL_SUCCESS, 
      Options: [],
    };

    expect(OptionReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETBYID_SUCCESS', () => {
    const action = { 
      type: OptionConstants.GETBYID_SUCCESS, 
      Options: [],
    };

    expect(OptionReducer(undefined, action)).toMatchSnapshot();
  });
});
