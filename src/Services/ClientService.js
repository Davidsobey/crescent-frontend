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
  };

  return Auth.fetch(
    `${api}/Clients/${subscription.clientID}/subscription?userId=${subscription.courseID}`,
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

function getClient(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Clients/${id}`,
    requestOptions,
  );
}

function editClient(values) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      id: parseInt(values.id, 10),
      name: values.name,
      email: values.email,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Clients/${values.id}`,
    requestOptions,
  );
}

const ClientService = {
  create,
  getAll,
  getById,
  subscribe,
  deleteClient,
  getClient,
  editClient,
};
export default ClientService;
