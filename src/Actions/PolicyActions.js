import PolicyConstants from '../Constants/PolicyConstants';
import PolicyService from '../Services/PolicyService';
import MaterialService from '../Services/MaterialService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(policy) {
  function request() {
    return { type: PolicyConstants.CREATE_REQUEST };
  }
  function success(newPolicyId) {
    return { type: PolicyConstants.CREATE_SUCCESS, policy, newPolicyId };
  }
  function failure(error) {
    return { type: PolicyConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({}));
    PolicyService.create(policy).then(
      (p) => {
        dispatch(success(p.id));
        history.push('/policy/material/create');
        dispatch(AlertActions.success('Policy created.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function createAcknowledgement(acknowledgement) {
  function request() {
    return { type: PolicyConstants.CREATE_ACKNOWLEDGEMENT_REQUEST, acknowledgement };
  }
  function success() {
    return { type: PolicyConstants.CREATE_ACKNOWLEDGEMENT_SUCCESS, acknowledgement };
  }
  function failure(error) {
    return { type: PolicyConstants.CREATE_ACKNOWLEDGEMENT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ acknowledgement }));
    PolicyService.createAcknowledgement(acknowledgement).then(
      () => {
        dispatch(success());
        // history.push(`/policy/${acknowledgement.policyID}/acknowledgement/list`);
        dispatch(AlertActions.success('Acknowledgement created'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function acknowledge(userId, policyId, successUrl) {
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
    dispatch(request());
    PolicyService.acknowledgePolicy(userId, policyId).then(
      () => {
        history.push(successUrl);
        dispatch(success());
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

function getOutstandingPoliciesForClient(clientId) {
  function request() {
    return {
      type: PolicyConstants.GETOUTSTANDINGPOLICIESFORCLIENT_REQUEST,
      clientId,
    };
  }
  function success(policies) {
    return {
      type: PolicyConstants.GETOUTSTANDINGPOLICIESFORCLIENT_SUCCESS,
      policies,
    };
  }
  function failure(error) {
    return {
      type: PolicyConstants.GETOUTSTANDINGPOLICIESFORCLIENT_FAILURE,
      error,
    };
  }

  return (dispatch) => {
    dispatch(request({ clientId }));

    PolicyService.getOutstandingPoliciesForClient(clientId).then(
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
    return { type: PolicyConstants.EDITPOLICY_REQUEST };
  }
  function success() {
    return { type: PolicyConstants.EDITPOLICY_SUCCESS };
  }
  function failure(error) {
    return { type: PolicyConstants.EDITPOLICY_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    PolicyService.editPolicy(policyId, policy).then(
      () => {
        history.push('/policy/list');
        dispatch(success());
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
    dispatch(request());

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
    return { type: PolicyConstants.UPLOAD_MATERIAL_REQUEST };
  }
  function success() {
    return { type: PolicyConstants.UPLOAD_MATERIAL_SUCCESS };
  }
  function failure(error) {
    return { type: PolicyConstants.UPLOAD_MATERIAL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ file }));
    PolicyService.uploadCreate(policyId).then(
      (PolicyMaterialId) => {
        MaterialService.uploadPolicyMaterial(PolicyMaterialId, file).then(
          () => {
            history.push('/policy/list');
            dispatch(success());
            dispatch(AlertActions.success('Policy Material created successfully.'));
          },
          (error) => {
            dispatch(failure(error));
            dispatch(AlertActions.error(error || error));
          },
        );
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

function getMaterialsForPolicy(policyId, policyName, policyDescription, canAcknowlege) {
  function request() {
    return { type: PolicyConstants.GET_MATERIALS_REQUEST };
  }
  function success(materials) {
    return {
      type: PolicyConstants.GET_MATERIALS_SUCCESS, policyId, policyName, policyDescription, materials, canAcknowlege,
    };
  }
  function failure(error) {
    return { type: PolicyConstants.GET_MATERIALS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(policyId));

    PolicyService.getMaterialsForPolicy(policyId).then(
      (materials) => {
        dispatch(success(materials));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function loadMaterial(policyMaterial) {
  /* function request(id) {
    return { type: ModuleConstants.LOAD_MATERIAL_REQUEST };
  } */
  function success(material) {
    return { type: PolicyConstants.LOAD_MATERIAL_SUCCESS, material };
  }
  function failure() {
    return { type: PolicyConstants.LOAD_MATERIAL_FAILURE };
  }
  return (dispatch) => {
    if (policyMaterial) {
      dispatch(success(policyMaterial));
    } else {
      dispatch(failure());
    }
  };
}

function loadMaterialPdf(pdfLink) {
  console.log('Load Material PDF');
  console.log(pdfLink);
  function success(link) {
    return { type: PolicyConstants.LOAD_MATERIAL_PDF_SUCCESS, link };
  }
  function failure() {
    return { type: PolicyConstants.LOAD_MATERIAL_PDF_FAILURE };
  }
  return (dispatch) => {
    if (pdfLink) {
      dispatch(success(pdfLink));
    } else {
      dispatch(failure());
    }
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
  getOutstandingPoliciesForClient,
  loadPolicy,
  uploadMaterial,
  getMaterial,
  getMaterialsForPolicy,
  loadMaterial,
  loadMaterialPdf,
};

export default PolicyActions;
