import PolicyConstants from '../Constants/PolicyConstants';

function PolicyReducer(state = {}, action) {
  switch (action.type) {
    case PolicyConstants.CREATE_REQUEST:
      return {
        policies: action.policyName,
      };
    case PolicyConstants.CREATE_SUCCESS:
      return {
        policies: action.policyName,
      };
    case PolicyConstants.CREATE_FAILURE:
      return {};
    case PolicyConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case PolicyConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        policies: action.policies,
      });
    case PolicyConstants.GETALL_FAILURE:
      return {
        policies: {},
      };
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_REQUEST:
      return {
        loading: true,
      };
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_SUCCESS:
      return Object.assign({}, state, {
        policies: action.policies,
      });
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_FAILURE:
      return {
        policies: {},
      };
    case PolicyConstants.CLEAR_POLICIES:
      return {
        policies: undefined,
      };
    default:
      return state;
  }
}

export default PolicyReducer;
