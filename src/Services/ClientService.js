import CommonConstants from '../Constants/CommonConstants';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const Auth = new AuthMiddleware();

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

  return Auth.fetch(`${api}/Clients`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(`${api}/Clients`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(`${api}/Clients/${id}`, requestOptions).then(handleResponse);
}

function subscribe(subscription) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription.courseID),
  };

  return Auth.fetch(
    `${api}/Clients/${subscription.clientID}/subscriptions`,
    requestOptions,
  ).then(handleResponse);
}

const ClientService = {
  create,
  getAll,
  getById,
  subscribe,
};
export default ClientService;
