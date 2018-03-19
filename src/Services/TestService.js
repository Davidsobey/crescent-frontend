const fetch = require('isomorphic-fetch');

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
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/Tests?Name=${testName}&ModuleID=${moduleID}&TotalMarks=${totalMarks}`,
    requestOptions,
  ).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    'https://crescenttesting.azurewebsites.net/api/Tests',
    requestOptions,
  ).then(handleResponse);
}

function loadTest(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/Tests/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function loadTestQuestions(userId, id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/EnrolmentTestQuestions/${userId}/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function markQuestion(id, answerGivenId) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, answerGivenId }),
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/EnrolmentTestQuestions/${id}/Mark`,
    requestOptions,
  ).then(handleResponse);
}

const ModuleServices = {
  create,
  getAll,
  loadTest,
  loadTestQuestions,
  markQuestion,
};
export default ModuleServices;
