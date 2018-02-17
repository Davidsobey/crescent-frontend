import CommonConstants from '../Constants/CommonConstants';

const fetch = require('isomorphic-fetch');

const api = CommonConstants.LIVE_API_ADDRESS;

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

function create(client) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  };

  return fetch(`${api}/Clients`, requestOptions)
    .then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${api}/Clients`, requestOptions)
    .then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${api}/Clients/${id}`, requestOptions)
    .then(handleResponse);
}

function subscribe(subscription) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  };

  return fetch(`${api}/Clients/subscriptions`, requestOptions)
    .then(handleResponse);
}

const ClientService = {
  create,
  getAll,
  getById,
  subscribe,
};
export default ClientService;
