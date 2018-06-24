import PolicyConstants from '../Constants/PolicyConstants';
import PolicyService from '../Services/PolicyService';
import MaterialService from '../Services/MaterialService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(policy, formfile) {
  function request() {
    return { type: PolicyConstants.CREATE_REQUEST };
  }
  function success() {
    return { type: PolicyConstants.CREATE_SUCCESS, policy };
  }
  function failure(error) {
    return { type: PolicyConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({}));
    PolicyService.create(policy, formfile).then(
      () => {
        dispatch(success());
        history.push('/policy/list');
        dispatch(AlertActions.success('Policy created.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function createAcknowledgement(userId, policyId) {
  function request() {
    return { type: PolicyConstants.CREATE_ACKNOWLEDGEMENT_REQUEST, userId };
  }
  function success() {
    return { type: PolicyConstants.CREATE_ACKNOWLEDGEMENT_SUCCESS, userId };
  }
  function failure(error) {
    return { type: PolicyConstants.CREATE_ACKNOWLEDGEMENT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ userId }));
    PolicyService.createAcknowledgement(userId, policyId).then(
      () => {
        dispatch(success(userId));
        history.push('/policy/acknowledgement/list');
        dispatch(AlertActions.success('Acknowledgement created.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function acknowledge(acknowledgement, userId, policyId) {
  function request() {
    return { type: PolicyConstants.ACKNOWLEDGE_REQUEST, userId };
  }
  function success() {
    return { type: PolicyConstants.ACKNOWLEDGE_SUCCESS, userId };
  }
  function failure(error) {
    return { type: PolicyConstants.ACKNOWLEDGE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ userId }));
    PolicyService.acknowledgePolicy(acknowledgement, userId, policyId).then(
      () => {
        dispatch(success(userId));
        history.push('/policy/acknowledgement/list');
        dispatch(AlertActions.success('Policy has been acknowledged.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getOutstandingPoliciesForUser(userId) {
  function request() {
    return {
      type: PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_REQUEST,
      userId,
    };
  }
  function success(policies) {
    return {
      type: PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_SUCCESS,
      policies,
    };
  }
  function failure(error) {
    return {
      type: PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_FAILURE,
      error,
    };
  }

  return (dispatch) => {
    dispatch(request({ userId }));

    PolicyService.getOutstandingPoliciesForUser(userId).then(
      policies => dispatch(success(policies)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getAll() {
  function request() {
    return { type: PolicyConstants.GETALL_REQUEST };
  }
  function success(policies) {
    return { type: PolicyConstants.GETALL_SUCCESS, policies };
  }
  function failure(error) {
    return { type: PolicyConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    PolicyService.getAll().then(
      policies => dispatch(success(policies)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getPolicy(policyId) {
  function request() {
    return { type: PolicyConstants.GETPOLICY_REQUEST };
  }
  function success(policy) {
    return { type: PolicyConstants.GETPOLICY_SUCCESS, policy };
  }
  function failure(error) {
    return { type: PolicyConstants.GETPOLICY_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    PolicyService.getPolicy(policyId).then(
      policies => dispatch(success(policies)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getMaterial(materialId) {
  function request() {
    return { type: PolicyConstants.GET_MATERIAL_REQUEST };
  }
  function success(material) {
    return { type: PolicyConstants.GET_MATERIAL_SUCCESS, material };
  }
  function failure(error) {
    return { type: PolicyConstants.GET_MATERIAL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    MaterialService.getPolicyMaterialByID(materialId).then(
      policies => dispatch(success(policies)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getClientPolicies(clientId) {
  function request() {
    return { type: PolicyConstants.GETCLIENTPOLICIES_REQUEST, clientId };
  }
  function success(policies) {
    return { type: PolicyConstants.GETCLIENTPOLICIES_SUCCESS, policies };
  }
  function failure(error) {
    return { type: PolicyConstants.GETCLIENTPOLICIES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    PolicyService.getClientPolicies(clientId).then(
      policies => dispatch(success(policies)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function deletePolicy(policyId) {
  function request() {
    return { type: PolicyConstants.DELETEPOLICY_REQUEST };
  }
  function success() {
    return { type: PolicyConstants.DELETEPOLICY_SUCCESS };
  }
  function failure(error) {
    return { type: PolicyConstants.DELETEPOLICY_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ policyId }));

    PolicyService.deletePolicy(policyId).then(
      policies => dispatch(success(policies)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function editPolicy(policy, policyId) {
  function request() {
    return { type: PolicyConstants.EDITPOLICY_REQUEST, policy };
  }
  function success() {
    return { type: PolicyConstants.EDITPOLICY_SUCCESS };
  }
  function failure(error) {
    return { type: PolicyConstants.EDITPOLICY_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ policy }));

    PolicyService.editPolicy(policyId, policy).then(
      () => {
        dispatch(success());
        history.push('/policy/list');
        dispatch(AlertActions.success('Acknowledgement edited successfully'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function clearPolicies() {
  function clear() {
    return { type: PolicyConstants.CLEAR_POLICIES };
  }
  return (dispatch) => {
    dispatch(clear());
  };
}

function loadPolicy(id) {
  function request() {
    return { type: PolicyConstants.LOAD_POLICY_REQUEST };
  }
  function success(policy) {
    return { type: PolicyConstants.LOAD_POLICY_SUCCESS, policy };
  }
  function failure(error) {
    return { type: PolicyConstants.LOAD_POLICY_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    PolicyService.getPolicy(id).then(
      (policy) => {
        dispatch(success(policy));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function uploadMaterial(policyId, file) {
  function request() {
    return { type: PolicyConstants.UPLOAD_MATERIAL_REQUEST, file };
  }
  function success() {
    return { type: PolicyConstants.UPLOAD_MATERIAL_SUCCESS, file };
  }
  function failure(error) {
    return { type: PolicyConstants.UPLOAD_MATERIAL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ file }));
    MaterialService.upload(policyId, file).then(
      () => {
        dispatch(success(file));
        history.push('/policy/material/list');
        dispatch(AlertActions.success('Material created successfully.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

const PolicyActions = {
  create,
  getAll,
  getPolicy,
  getClientPolicies,
  clearPolicies,
  acknowledge,
  createAcknowledgement,
  editPolicy,
  deletePolicy,
  getOutstandingPoliciesForUser,
  loadPolicy,
  uploadMaterial,
  getMaterial,
};

export default PolicyActions;
