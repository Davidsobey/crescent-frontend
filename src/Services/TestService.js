import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

function create(moduleID, testName, totalMarks) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: testName,
      moduleID,
      totalMarks,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Tests`,
    requestOptions,
  ).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Tests`,
    requestOptions,
  ).then(handleResponse);
}

function loadTest(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Tests/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function loadTestQuestions(userId, id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${
      CommonConstants.LIVE_PROD_ADDRESS
    }/EnrolmentTestQuestions/${userId}/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function markQuestion(id, answerGivenId) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, answerGivenId }),
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/EnrolmentTestQuestions/${id}/Mark`,
    requestOptions,
  ).then(handleResponse);
}

function submitTest(testId, courseId, userId) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${
      CommonConstants.LIVE_PROD_ADDRESS
    }/Tests/${testId}/EnrolmentTest/${courseId}/${userId}`,
    requestOptions,
  ).then(handleResponse);
}

const ModuleServices = {
  create,
  getAll,
  loadTest,
  loadTestQuestions,
  markQuestion,
  submitTest,
};
export default ModuleServices;
