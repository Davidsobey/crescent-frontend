import OptionConstants from '../Constants/OptionConstants';
import OptionServices from '../Services/OptionService';
import AlertActions from './AlertActions';

function create(questionId, title, isAnswer) {
  function request() {
    return { type: OptionConstants.CREATE_REQUEST };
  }
  function success(option) {
    return { type: OptionConstants.CREATE_SUCCESS, option };
  }
  function failure(error) {
    return { type: OptionConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    OptionServices.create(questionId, title, isAnswer).then(
      (option) => {
        dispatch(success(option));
        dispatch(AlertActions.success('Option created.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function update(option) {
  function request() {
    return { type: OptionConstants.UPDATE_REQUEST };
  }
  function success() {
    return { type: OptionConstants.UPDATE_SUCCESS, option };
  }
  function failure(error) {
    return { type: OptionConstants.UPDATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    OptionServices.update(option).then(
      (option) => {
        dispatch(success());
        dispatch(AlertActions.success('Option updated.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

const OptionActions = {
  create,
  update,
};

export default OptionActions;
