import AuthMiddleware from '../Middleware/AuthMiddleware';

const Auth = new AuthMiddleware();

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

function filteredList(response, id) {
  const objects = response.filter(obj => obj.courseId === id);
  return objects;
}

function create(policyVM, formFile) {
  // get the logged in user to know who is creating
  const creator = Auth.getProfile();
  const createdBy = creator.nameid;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Name: policyVM.policyName,
      Description: policyVM.policyDescription,
      CreatedBy: createdBy,
      FormFile: formFile,
    }),
  };

  return Auth.fetch(
    'https://crescenttesting.azurewebsites.net/api/Policies',
    requestOptions,
  ).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    'https://crescenttesting.azurewebsites.net/api/Policies',
    requestOptions,
  ).then(handleResponse);
}

function getPolicies(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const objectList = Auth.fetch(
    'https://crescenttesting.azurewebsites.net/api/Policies',
    requestOptions,
  )
    .then(handleResponse)
    .then(data => filteredList(data, id));

  return objectList;
}

function getClientPolicies(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const objectList = Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Policies/CreatedBy/${id}`,
    requestOptions,
  )
    .then(handleResponse)
    .then(data => filteredList(data, id));

  return objectList;
}

function getUserOutstandingPolicies(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const objectList = Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Policies/Acknowledgements/${id}/Outstanding`,
    requestOptions,
  )
    .then(handleResponse)
    .then(data => filteredList(data, id));

  return objectList;
}

function acknowledgePolicy(Acknowledgement, userId, policyId) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ acknowledgement: Acknowledgement }),
  };

  return Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Policies/${policyId}/Acknowledgements/${userId}`,
    requestOptions,
  ).then(handleResponse);
}

function createAcknowledgement(userId, policyId) {
  const requestOptions = {
    method: 'POST',
    headders: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Policies/${policyId}/Acknowledgements/${userId}`,
    requestOptions,
  ).then(handleResponse);
}

function editPolicy(id, policyVM) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ PolicyVM: policyVM }),
  };

  return Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Policies/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function deletePolicy(id) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Policies/Delete/${id}`,
    requestOptions,
  )
    .then(handleResponse);
}

function loadAcknowledgements(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Policies/${id}/Acknowledgements`,
    requestOptions,
  ).then(handleResponse);
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}

let materialDetails = [];

async function delayedLog(item) {
  await delay();
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Materials/${item}`,
    requestOptions,
  ).then(handleResponse);
}

async function processArray(array) {
  materialDetails = [];
  const promises = array.map(delayedLog);
  const a = await Promise.all(promises).then(result => result);
  return a;
}

function getPolicyMaterial(ids) {
  materialDetails = processArray(ids);
  return materialDetails;
}

const PolicyServices = {
  create,
  getAll,
  getPolicies,
  getPolicyMaterial,
  loadAcknowledgements,
  getClientPolicies,
  getUserOutstandingPolicies,
  acknowledgePolicy,
  createAcknowledgement,
  deletePolicy,
  editPolicy,
};
export default PolicyServices;
