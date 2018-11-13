import QuestionConstants from '../Constants/QuestionConstants';
import CourseConstants from '../Constants/CourseConstants';
import ModuleConstants from '../Constants/ModuleConstants';
import TestConstants from '../Constants/TestConstants';
import QuestionService from '../Services/QuestionService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(question) {
  function request() {
    return { type: QuestionConstants.CREATE_REQUEST, question };
  }
  function success(questionResponse) {
    return { type: QuestionConstants.CREATE_SUCCESS, questionResponse };
  }
  function failure(error) {
    return { type: QuestionConstants.CREATE_FAILURE, error };
  }
  function courseSuccess(newCourseId) {
    return { type: CourseConstants.CREATE_SUCCESS, newCourseId };
  }
  function moduleSuccess(newModuleId) {
    return { type: ModuleConstants.CREATE_SUCCESS, newModuleId };
  }
  function testSuccess(newTestId) {
    return { type: TestConstants.CREATE_SUCCESS, newTestId };
  }

  return (dispatch) => {
    dispatch(request({ question }));
    QuestionService.create(question).then(
      (questionResponse) => {
        console.log('questionResponse', questionResponse);
        dispatch(success(questionResponse));
        dispatch(courseSuccess(questionResponse.test.module.courseId));
        dispatch(moduleSuccess(questionResponse.test.moduleId));
        dispatch(testSuccess(questionResponse.testId));
        history.push('/question/options');
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

function loadQuestionByTest(id) {
  function request() {
    return { type: QuestionConstants.LOADQUESTIONS_REQUEST };
  }
  function success(questions) {
    return { type: QuestionConstants.LOADQUESTIONS_SUCCESS, questions };
  }
  function failure(error) {
    return { type: QuestionConstants.LOADQUESTIONS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.getQuestionsForTest(id).then(
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
  function failure(error) {
    return { type: QuestionConstants.GETBYID_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.getById(id).then(
      question => dispatch(success(question)),
      error => dispatch(failure(error)),
    );
  };
}

function deleteQuestion(id) {
  function request() {
    return { type: QuestionConstants.DELETE_REQUEST, id };
  }
  function success() {
    return { type: QuestionConstants.DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: QuestionConstants.DELETE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.deleteQuestion(id).then(
      () => {
        dispatch(success(id));
        dispatch(AlertActions.success('Question deleted.'));
        history.push('/question/list');
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function editQuestion(values) {
  function request() {
    return { type: QuestionConstants.EDIT_QUESTION_REQUEST };
  }
  function success() {
    return { type: QuestionConstants.EDIT_QUESTION_SUCCESS };
  }
  function failure(error) {
    return { type: QuestionConstants.EDIT_QUESTION_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request());
    QuestionService.editQuestion(values).then(
      () => {
        history.push('/question/list');
        dispatch(success());
        dispatch(AlertActions.success(`Question ${values.title} edited.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getOptions(obj) {
  function request() {
    return { type: QuestionConstants.OPTIONS_REQUEST, obj };
  }
  function success(questionOptions) {
    return { type: QuestionConstants.OPTIONS_SUCCESS, questionOptions };
  }
  function failure(error) {
    return { type: QuestionConstants.OPTIONS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.getOptions(obj.id).then(
      (questionOptions) => {
        dispatch(success(questionOptions));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function editOptionIsAnswer(values) {
  function request() {
    return { type: QuestionConstants.OPTIONS_ISANSWER_REQUEST };
  }
  function success() {
    return { type: QuestionConstants.OPTIONS_ISANSWER_SUCCESS, values };
  }
  function failure(error) {
    return { type: QuestionConstants.OPTIONS_ISANSWER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.editOptionIsAnswer(values).then(
      (questionOptions) => {
        dispatch(success(questionOptions));
        history.push('/question/options');
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function deleteQuestionOption(id) {
  function request() {
    return { type: QuestionConstants.DELETE_QO_REQUEST };
  }
  function success() {
    return { type: QuestionConstants.DELETE_QO_SUCCESS, id };
  }
  function failure(error) {
    return { type: QuestionConstants.DELETE_QO_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.deleteQuestionOption(id).then(
      () => {
        dispatch(success(id));
        dispatch(AlertActions.success('Question Option deleted.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function clearQuestion() {
  function clear() {
    return { type: QuestionConstants.CLEAR_QUESTION };
  }
  return (dispatch) => {
    dispatch(clear());
  };
}

const QuestionActions = {
  create,
  getAll,
  loadQuestionByTest,
  getByID,
  deleteQuestion,
  editQuestion,
  clearQuestion,
  getOptions,
  editOptionIsAnswer,
  deleteQuestionOption,
};

export default QuestionActions;
