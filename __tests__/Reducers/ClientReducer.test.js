// Reducer to be tested
import ClientReducer from '../../src/Reducers/ClientReducer';
import ClientConstants from '../../src/Constants/ClientConstants';

describe('ClientReducer', () => {
  test('CREATE_SUCCESS', () => {
    const action = { 
      type: ClientConstants.CREATE_SUCCESS, 
      client: {id:1, name:'aaa'},
    };

    expect(ClientReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETALL_SUCCESS', () => {
    const action = { 
      type: ClientConstants.GETALL_SUCCESS, 
      clients: [],
    };

    expect(ClientReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETBYID_SUCCESS', () => {
    const action = { 
      type: ClientConstants.GETBYID_SUCCESS, 
      client: {id:1, name:'aaa'},
    };

    expect(ClientReducer(undefined, action)).toMatchSnapshot();
  });

  test('SUBSCRIBE_SUCCESS', () => {
    const action = { 
      type: ClientConstants.SUBSCRIBE_SUCCESS, 
      subscription: 1,
    };

    expect(ClientReducer(undefined, action)).toMatchSnapshot();
  });

  test('LOAD_CLIENT_SUCCESS', () => {
    const action = { 
      type: ClientConstants.LOAD_CLIENT_SUCCESS, 
      client: {id:1, name:'aaa'},
    };

    expect(ClientReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETUSERENROLMENTS_SUCCESS', () => {
    const action = { 
      type: ClientConstants.GETUSERENROLMENTS_SUCCESS, 
      userEnrolments: [],
    };

    expect(ClientReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETSUBSCRIPTIONS_SUCCESS', () => {
    const action = { 
      type: ClientConstants.GETSUBSCRIPTIONS_SUCCESS, 
      subscriptions: [],
    };

    expect(ClientReducer(undefined, action)).toMatchSnapshot();
  });

  test('EDIT_SUCCESS', () => {
    const action = { 
      type: ClientConstants.EDIT_SUCCESS, 
    };

    expect(ClientReducer(undefined, action)).toMatchSnapshot();
  });
  
});
