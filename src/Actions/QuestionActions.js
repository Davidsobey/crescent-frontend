import QuestionConstants from '../Constants/QuestionConstants';
import QuestionService from '../Services/QuestionService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(question) {
  function request() {
    return { type: QuestionConstants.CREATE_REQUEST, question };
  }
  function success() {
    return { type: QuestionConstants.CREATE_SUCCESS, question };
  }
  function failure(error) {
    return { type: QuestionConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ question }));
    QuestionService.create(question).then(
      () => {
        dispatch(success(question));
        history.push('/question/list');
        dispatch(AlertActions.success('Question created.'));
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
    return { type: QuestionConstants.GETALL_REQUEST };
  }
  function success(questions) {
    return { type: QuestionConstants.GETALL_SUCCESS, questions };
  }
  function failure(error) {
    return { type: QuestionConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.getAll().then(
      questions => dispatch(success(questions)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getByID(id) {
  function request() {
    return { type: QuestionConstants.GETBYID_REQUEST };
  }
  function success(question) {
    return { type: QuestionConstants.GETBYID_SUCCESS, question };
  }
  function failure(question) {
    return { type: QuestionConstants.GETBYID_FAILURE, question };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.getById(id).then(
      question => dispatch(success(question)),
      error => dispatch(failure(error)),
    );
  };
}

function loadQuestionsByTest(testId) {
  function request() {
    return { type: QuestionConstants.LOADQUESTIONS_REQUEST };
  }
  function success(tests) {
    return { type: QuestionConstants.LOADQUESTIONS_SUCCESS, tests };
  }
  function failure(error) {
    return { type: QuestionConstants.LOADQUESTIONS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.getQuestionsForTest(testId).then(
      questions => dispatch(success(questions)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

const QuestionActions = {
  create,
  getAll,
  getByID,
  loadQuestionsByTest,
};

export default QuestionActions;
