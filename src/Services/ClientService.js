import CommonConstants from '../Constants/CommonConstants';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const Auth = new AuthMiddleware();

const api = CommonConstants.API_ENDPOINT;

function create(client) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(client),
  };

  return Auth.fetch(`${api}/Clients`, requestOptions);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${api}/Clients`, requestOptions);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${api}/Clients/${id}`, requestOptions);
}

function subscribe(subscription) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(subscription.courseID),
  };

  return Auth.fetch(
    `${api}/Clients/${subscription.clientID}/subscriptions`,
    requestOptions,
  );
}

function deleteClient(id) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Clients/Delete/${id}`,
    requestOptions,
  );
}

const ClientService = {
  create,
  getAll,
  getById,
  subscribe,
  deleteClient,
};
export default ClientService;
