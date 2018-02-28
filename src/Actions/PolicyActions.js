import PolicyConstants from '../Constants/PolicyConstants';
import PolicyService from '../Services/PolicyService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(policyName, policyDescription) {
  function request() {
    return { type: PolicyConstants.CREATE_REQUEST, policyName };
  }
  function success() {
    return { type: PolicyConstants.CREATE_SUCCESS, policyName };
  }
  function failure(error) {
    return { type: PolicyConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ policyName }));
    PolicyService.create(policyName, policyDescription).then(
      () => {
        dispatch(success(policyName));
        history.push('/policy/list');
        dispatch(AlertActions.success(`Policy ${policyName} created.`));
      },
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

const PolicyActions = {
  create,
  getAll,
};

export default PolicyActions;
