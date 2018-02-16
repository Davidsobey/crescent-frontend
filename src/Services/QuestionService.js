const fetch = require('isomorphic-fetch');

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

  return fetch('https://crescenttesting.azurewebsites.net/api/Questions', requestOptions)
    .then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    'https://crescenttesting.azurewebsites.net/api/Questions',
    requestOptions,
  ).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/Questions/${id}`, requestOptions)
    .then(handleResponse);
}

function update(question) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(question),
  };

  return fetch(`/Questions/${question.id}`, requestOptions)
    .then(handleResponse);
}

const QuestionServices = {
  create,
  getAll,
  getById,
  update,
};

export default QuestionServices;
