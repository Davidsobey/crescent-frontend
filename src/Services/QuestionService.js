import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

function create(question) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(question),
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Questions`,
    requestOptions,
  ).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Questions`,
    requestOptions,
  ).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Questions/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function update(question) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(question),
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Questions/${question.id}`,
    requestOptions,
  ).then(handleResponse);
}

const QuestionServices = {
  create,
  getAll,
  getById,
  update,
};

export default QuestionServices;
