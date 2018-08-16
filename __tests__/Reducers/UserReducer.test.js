// Reducer to be tested
import UserReducer from '../../src/Reducers/UserReducer';
import UserConstants from '../../src/Constants/UserConstants';

describe('UserReducer', () => {
  test('GETALL_SUCCESS', () => {
    const action = { 
      type: UserConstants.GETALL_SUCCESS, 
      users: [],
    };

    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });

  test('GET_ALL_ROLES_SUCCESS', () => {
    const action = { 
      type: UserConstants.GET_ALL_ROLES_SUCCESS,
      roles: [],
    };

    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });

  test('REGISTER_SUCCESS', () => {
    const action = { 
      type: UserConstants.REGISTER_SUCCESS,
      userName: "a",
    };

    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });

  test('ENROL_SUCCESS', () => {
    const action = { 
      type: UserConstants.ENROL_SUCCESS,
      enrolment: "enrolment",
    };

    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETUSER_SUCCESS', () => {
    const action = { 
      type: UserConstants.GETUSER_SUCCESS,
      id: 0,
    };

    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });

  test('DELETE_SUCCESS', () => {
    const action = { 
      type: UserConstants.DELETE_SUCCESS,
      id: 0,
    };
    const state = { 
      users: [],
    };

    expect(UserReducer(state, action)).toMatchSnapshot();
  });

  test('EDIT_USER_SUCCESS', () => {
    const action = { 
      type: UserConstants.EDIT_USER_SUCCESS,
      user: undefined,
      user_editing: false,
    };

    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });
});
