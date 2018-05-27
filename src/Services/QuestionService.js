import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function create(question) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(question),
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
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/${values.id}`,
    requestOptions,
  );
}

const QuestionServices = {
  create,
  getAll,
  getById,
  update,
  deleteQuestion,
  editQuestion,
};

export default QuestionServices;
