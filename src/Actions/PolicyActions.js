import PolicyConstants from '../Constants/PolicyConstants';
import PolicyService from '../Services/PolicyService';
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
    dispatch(request({ }));
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
    return { type: PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_REQUEST, userId };
  }
  function success(policies) {
    return { type: PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_SUCCESS, policies };
  }
  function failure(error) {
    return { type: PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_FAILURE, error };
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

    PolicyService.getPolicies().then(
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
};

export default PolicyActions;
