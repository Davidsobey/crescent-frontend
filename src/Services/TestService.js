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

const ModuleServices = {
  create,
  getAll,
};
export default ModuleServices;
