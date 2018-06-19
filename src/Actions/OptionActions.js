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
    const option = {
      title,
      isAnswer,
      questionId,
      question: null,
      active: true,
    };
    dispatch(request());
    OptionServices.create(questionId, title, isAnswer).then(
      () => {
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

const OptionActions = {
  create,
};

export default OptionActions;
