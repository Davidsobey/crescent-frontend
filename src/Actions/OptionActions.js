import OptionConstants from '../Constants/OptionConstants';
import OptionServices from '../Services/OptionService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(option) {
  function request() {
    return { type: OptionConstants.CREATE_REQUEST, option };
  }
  function success() {
    return { type: OptionConstants.CREATE_SUCCESS, option };
  }
  function failure(error) {
    return { type: OptionConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ option }));
    OptionServices.create(option).then(
      () => {
        dispatch(success(option));
        history.push('/option/list');
        dispatch(AlertActions.success('Option created.'));
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
    return { type: OptionConstants.GETALL_REQUEST };
  }
  function success(options) {
    return { type: OptionConstants.GETALL_SUCCESS, options };
  }
  function failure(error) {
    return { type: OptionConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    OptionServices.getAll().then(
      options => dispatch(success(options)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getByID(id) {
  function request() {
    return { type: OptionConstants.GETBYID_REQUEST };
  }
  function success(option) {
    return { type: OptionConstants.GETBYID_SUCCESS, option };
  }
  function failure(option) {
    return { type: OptionConstants.GETBYID_FAILURE, option };
  }

  return (dispatch) => {
    dispatch(request());

    OptionServices.getById(id).then(
      option => dispatch(success(option)),
      error => dispatch(failure(error)),
    );
  };
}

const OptionActions = {
  create,
  getAll,
  getByID,
};

export default OptionActions;
