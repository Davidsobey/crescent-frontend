import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function filteredList(response, id) {
  const objects = response.filter(obj => obj.testId === id);
  return objects;
}

function create(question) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      title: question.questionTitle,
      allocatedMarks: question.questionAllocatedMarks,
      testId: question.test,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions`,
    requestOptions,
  );
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions`,
    requestOptions,
  );
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/${id}`,
    requestOptions,
  );
}

function update(question) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(question),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/${question.id}`,
    requestOptions,
  );
}

function getQuestionsForTest(testId) {
  const requestOptions = {
    method: 'GET',
  };

  const objectList = Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions`,
    requestOptions,
  ).then(data => filteredList(data, testId));

  return objectList;
}

function deleteQuestion(id) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/Delete/${id}`,
    requestOptions,
  );
}

function editQuestion(values) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      id: parseInt(values.id, 10),
      title: values.title,
      allocatedMarks: values.allocatedMarks,
      testId: parseInt(values.testId, 10),
      // questionDifficulty: parseInt(2, 10),
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/${values.id}`,
    requestOptions,
  );
}

function getOptions(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/${id}/QuestionOptions`,
    requestOptions,
  );
}

function editOptionIsAnswer(values) {
  const isAnswer = !values.isAnswer;
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      id: parseInt(values.id, 10),
      title: values.title,
      isAnswer,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/QuestionOptions/${values.id}`,
    requestOptions,
  );
}

function deleteQuestionOption(id) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/QuestionOptions/Delete/${id}`,
    requestOptions,
  );
}

const QuestionService = {
  create,
  getAll,
  getById,
  update,
  getQuestionsForTest,
  deleteQuestion,
  editQuestion,
  getOptions,
  editOptionIsAnswer,
  deleteQuestionOption,
};

export default QuestionService;
