import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function filteredList(response, id) {
  const objects = response.filter(obj => obj.courseId === id);
  return objects;
}

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

const QuestionServices = {
  create,
  getAll,
  getById,
  update,
  getQuestionsForTest,
};

export default QuestionServices;
