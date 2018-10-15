import { isNumber } from 'util';

import PolicyConstants from '../Constants/PolicyConstants';

function filterById(id, delId) {
  if (isNumber(id) && id !== 0 && id !== delId) {
    return true;
  }
  return false;
}

function PolicyReducer(state = {}, action) {
  switch (action.type) {
    case PolicyConstants.CREATE_REQUEST:
      return Object.assign({}, state, {
        newPolicyId: undefined,
        creating: true,
      });
    case PolicyConstants.CREATE_SUCCESS:
      return Object.assign({}, state, {
        newPolicyId: action.newPolicyId,
        creating: false,
      });
    case PolicyConstants.CREATE_FAILURE:
      return Object.assign({}, state, {
        newPolicyId: undefined,
        creating: false,
      });
    case PolicyConstants.UPLOAD_MATERIAL_REQUEST:
      return Object.assign({}, state, {
        creating: true,
      });
    case PolicyConstants.UPLOAD_MATERIAL_SUCCESS:
      return Object.assign({}, state, {
        creating: false,
      });
    case PolicyConstants.UPLOAD_MATERIAL_FAILURE:
      return Object.assign({}, state, {
        creating: false,
      });
    case PolicyConstants.GETALL_REQUEST:
      return Object.assign({}, state, {
        policies: [],
        loading: true,
      });
    case PolicyConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        policies: action.policies,
        loading: false,
      });
    case PolicyConstants.GETALL_FAILURE:
      return Object.assign({}, state, {
        policies: [],
        loading: false,
      });
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_REQUEST:
      return {
        loading: true,
      };
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_SUCCESS:
      return Object.assign({}, state, {
        policyAcknowledgements: action.policies,
        loading: false,
      });
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_FAILURE:
      return {
        policyAcknowledgements: {},
        loading: false,
      };
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORCLIENT_REQUEST:
      return Object.assign({}, state, {
        policyAcknowledgements: [],
        loading: true,
      });
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORCLIENT_SUCCESS:
      return Object.assign({}, state, {
        policyAcknowledgements: action.policies,
        loading: false,
      });
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORCLIENT_FAILURE:
      return Object.assign({}, state, {
        policyAcknowledgements: [],
        loading: false,
      });
    case PolicyConstants.ACKNOWLEDGE_REQUEST:
      return Object.assign({}, state, {
        acknowledging: true,
      });
    case PolicyConstants.ACKNOWLEDGE_SUCCESS:
      return Object.assign({}, state, {
        policy: action.policyName,
        acknowledging: false,
      });
    case PolicyConstants.ACKNOWLEDGE_FAILURE:
      return Object.assign({}, state, {
        acknowledging: false,
      });
    case PolicyConstants.CLEAR_POLICIES:
      return {};
    case PolicyConstants.LOAD_POLICY_REQUEST:
      return {
        policy_loading: true,
      };
    case PolicyConstants.LOAD_POLICY_SUCCESS:
      return Object.assign({}, state, {
        policy: action.policy,
        policy_loading: false,
      });
    case PolicyConstants.LOAD_POLICY_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        policy_loading: false,
      });
    case PolicyConstants.DELETEPOLICY_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case PolicyConstants.DELETEPOLICY_SUCCESS:
      return Object.assign({}, state, {
        policy: state.policy.filter(obj => filterById(obj.id, action.id)),
        loading: false,
      });
    case PolicyConstants.DELETEPOLICY_FAILURE:
      return state;
    case PolicyConstants.EDITPOLICY_REQUEST:
      return Object.assign({}, state, {
        policy_editing: true,
      });
    case PolicyConstants.EDITPOLICY_SUCCESS:
      return Object.assign({}, state, {
        policy: undefined,
        policy_editing: false,
      });
    case PolicyConstants.EDITPOLICY_FAILURE:
      return Object.assign({}, state, {
        erro: action.error,
        policy_editing: false,
      });
    case PolicyConstants.GET_MATERIAL_REQUEST:
      return Object.assign({}, state, {
        loadingMaterial: true,
      });
    case PolicyConstants.GET_MATERIAL_SUCCESS:
      return Object.assign({}, state, {
        loadingMaterial: false,
        policyMaterial: action.material,
      });
    case PolicyConstants.GET_MATERIAL_FAILURE:
      return Object.assign({}, state, { policyMaterial: [] });
    case PolicyConstants.GET_MATERIALS_REQUEST:
      return Object.assign({}, state, {
        policyMaterials: [],
        policyMaterials_loading: true,
      });
    case PolicyConstants.GET_MATERIALS_SUCCESS:
      return Object.assign({}, state, {
        policyMaterials: action.materials,
        policyId: action.policyId,
        policyName: action.policyName,
        policyDescription: action.policyDescription,
        canAcknowlege: action.canAcknowlege,
        policyMaterials_loading: false,
      });
    case PolicyConstants.GET_MATERIALS_FAILURE:
      return Object.assign({}, state, {
        policyMaterials: [],
        policyMaterials_loading: false,
      });
    case PolicyConstants.CREATE_ACKNOWLEDGEMENT_REQUEST:
      return Object.assign({}, state, {
        creating: true,
      });
    case PolicyConstants.CREATE_ACKNOWLEDGEMENT_SUCCESS:
      return Object.assign({}, state, {
        creating: false,
      });
    case PolicyConstants.CREATE_ACKNOWLEDGEMENT_FAILURE:
      return Object.assign({}, state, {
        creating: false,
      });
    case PolicyConstants.LOAD_MATERIAL_SUCCESS:
      return Object.assign({}, state, {
        material: action.material,
      });
    case PolicyConstants.LOAD_MATERIAL_FAILURE:
      return {
        material: null,
      };
    default:
      return state;
  }
}

export default PolicyReducer;
