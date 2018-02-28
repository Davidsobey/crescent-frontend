const fetch = require('isomorphic-fetch');

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

function create(policyName, policyDescription) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: policyName,
      description: policyDescription,
    }),
  };

  return fetch(
    'https://crescenttesting.azurewebsites.net/api/Policies',
    requestOptions,
  ).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    'https://crescenttesting.azurewebsites.net/api/Policies',
    requestOptions,
  ).then(handleResponse);
}

const PolicyService = {
  create,
  getAll,
};
export default PolicyService;
