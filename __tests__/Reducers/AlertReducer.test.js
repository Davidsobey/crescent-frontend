// Reducer to be tested
import AlertReducer from '../../src/Reducers/AlertReducer';
import AlertConstants from '../../src/Constants/AlertConstants';

describe('AlertReducer', () => {
  test('ALERT_SUCCESS', () => {
    const action = { 
      type: AlertConstants.ALERT_SUCCESS, 
      message: 'success',
    };

    expect(AlertReducer(undefined, action)).toMatchSnapshot();
  });
});
