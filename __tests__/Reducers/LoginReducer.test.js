// Reducer to be tested
import LoginReducer from '../../src/Reducers/LoginReducer';
import UserConstants from '../../src/Constants/UserConstants';

describe('LoginReducer', () => {
  test('LOGIN_SUCCESS', () => {
    const action = { 
      type: UserConstants.LOGIN_SUCCESS, 
      user: {id:1, name:'aaa'},
    };

    expect(LoginReducer(undefined, action)).toMatchSnapshot();
  });
});
