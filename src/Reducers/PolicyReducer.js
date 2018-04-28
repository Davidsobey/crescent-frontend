import ModuleConstants from '../Constants/ModuleConstants';

function ModuleReducer(state = {}, action) {
  switch (action.type) {
    case ModuleConstants.CREATE_REQUEST:
      return {
        policies: action.policyName,
      };
    case ModuleConstants.CREATE_SUCCESS:
      return {
        policies: action.policyName,
      };
    case ModuleConstants.CREATE_FAILURE:
      return {};

    case ModuleConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case ModuleConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        policies: action.policies,
      });
    case ModuleConstants.GETALL_FAILURE:
      return {
        policies: {},
      };

    case ModuleConstants.LOADPOLICY_REQUEST:
      return {
        loading: true,
      };
    case ModuleConstants.LOADPOLICY_SUCCESS:
      return Object.assign({}, state, {
        policies: action.policies,
        loading: false,
      });
    case ModuleConstants.LOADPOLICY_FAILURE:
      return {
        policies: {},
      };

    case ModuleConstants.CLEAR_POLICIES:
      return {
        policies: undefined,
      };

    case ModuleConstants.POLICY_MATERIAL_REQUEST:
      return Object.assign({}, state, {
        loadingMaterial: true,
      });
    case ModuleConstants.POLICY_MATERIAL_SUCCESS:
      return Object.assign({}, state, {
        loadingMaterial: false,
        policyMaterial: action.policyMaterials,
      });
    case ModuleConstants.POLICY_MATERIAL_FAILURE:
      return Object.assign({}, state, { policyMaterial: [] });

    case ModuleConstants.LOADTESTS_REQUEST:
      return Object.assign({}, state, {
        loadingTests: true,
      });
    case ModuleConstants.LOADTESTS_SUCCESS:
      return Object.assign({}, state, {
        loadingTests: false,
        policyTests: action.policyTests,
      });
    case ModuleConstants.LOADTESTS_FAILURE:
      return Object.assign({}, state, { policyTests: [] });

    default:
      return state;
  }
}

export default ModuleReducer;
