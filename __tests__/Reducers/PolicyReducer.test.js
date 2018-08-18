// Reducer to be tested
import PolicyReducer from '../../src/Reducers/PolicyReducer';
import PolicyConstants from '../../src/Constants/PolicyConstants';

describe('PolicyReducer', () => {
  test('CREATE_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.CREATE_SUCCESS, 
      newPolicyId: 1,
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });

  test('CREATE_ACKNOWLEDGEMENT_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.CREATE_ACKNOWLEDGEMENT_SUCCESS, 
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('ACKNOWLEDGE_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.ACKNOWLEDGE_SUCCESS, 
      policyName: 'ddd',
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('GETALL_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.GETALL_SUCCESS, 
      policies: [],
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('GETOUTSTANDINGPOLICIESFORUSER_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_SUCCESS, 
      policies: [],
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('GETOUTSTANDINGPOLICIESFORCLIENT_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.GETOUTSTANDINGPOLICIESFORCLIENT_SUCCESS, 
      policies: [],
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('EDITPOLICY_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.EDITPOLICY_SUCCESS, 
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('DELETEPOLICY_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.DELETEPOLICY_SUCCESS, 
      id: 1,
    };

    const state = {
      policy: []
    }

    expect(PolicyReducer(state, action)).toMatchSnapshot();
  });
  
  test('LOAD_POLICY_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.LOAD_POLICY_SUCCESS, 
      policy: {id:1, name:'111'},
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('UPLOAD_MATERIAL_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.UPLOAD_MATERIAL_SUCCESS, 
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('GET_MATERIAL_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.GET_MATERIAL_SUCCESS, 
      material: {},
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('GET_MATERIALS_SUCCESS', () => {
    const action = { 
      type: PolicyConstants.GET_MATERIALS_SUCCESS, 
      materials: [],
      policyId: 1,
      policyName: '111',
      policyDescription: '111',
      canAcknowlege: false,
    };

    expect(PolicyReducer(undefined, action)).toMatchSnapshot();
  });
});
