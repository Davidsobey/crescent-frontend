import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function filteredList(response, id) {
  const objects = response.filter(obj => obj.courseId === id);
  return objects;
}

function create(policyVM) {
  // get the logged in user to know who is creating
  const creator = Auth.getProfile();
  const createdBy = creator.nameid;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      Name: policyVM.policyName,
      Description: policyVM.policyDescription,
      CreatedBy: createdBy,
    }),
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Policies`, requestOptions);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Policies`, requestOptions);
}

function getPolicy(id) {
  const requestOptions = {
    method: 'GET',
  };

  const objectList = Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Policies/${id}`,
    requestOptions,
  );

  return objectList;
}

function getClientPolicies(id) {
  const requestOptions = {
    method: 'GET',
  };

  const objectList = Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Policies/CreatedBy/${id}`,
    requestOptions,
  ).then(data => filteredList(data, id));

  return objectList;
}

function getUserOutstandingPolicies(id) {
  const requestOptions = {
    method: 'GET',
  };

  const objectList = Auth.fetch(
    `${
      CommonConstants.API_ENDPOINT
    }/Policies/Acknowledgements/${id}/Outstanding`,
    requestOptions,
  ).then(data => filteredList(data, id));

  return objectList;
}

function acknowledgePolicy(Acknowledgement, userId, policyId) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({ acknowledgement: Acknowledgement }),
  };

  return Auth.fetch(
    `${
      CommonConstants.API_ENDPOINT
    }/Policies/${policyId}/Acknowledgements/${userId}`,
    requestOptions,
  );
}

function createAcknowledgement(acknowledgement) {
  const requestOptions = {
    method: 'POST',
    headders: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Policies/${
      acknowledgement.policyID
    }/Acknowledgements/${acknowledgement.userID}`,
    requestOptions,
  );
}

function editPolicy(id, policyVM) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({ PolicyVM: policyVM }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Policies/${id}`,
    requestOptions,
  );
}

function deletePolicy(id) {
  const requestOptions = {
    method: 'PUT',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Policies/Delete/${id}`,
    requestOptions,
  );
}

function getAcknowledgementsForPolicy(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Policies/${id}/Acknowledgements`,
    requestOptions,
  );
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}

let materialDetails = [];

async function delayedLog(item) {
  await delay();
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `https://crescenttesting.azurewebsites.net/api/Materials/${item}`,
    requestOptions,
  );
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

function uploadCreate(policyId) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      policyId,
    }),
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/PolicyMaterials`,
    requestOptions,
  );
}

const PolicyServices = {
  create,
  getAll,
  getPolicy,
  getPolicyMaterial,
  getAcknowledgementsForPolicy,
  getClientPolicies,
  getUserOutstandingPolicies,
  acknowledgePolicy,
  createAcknowledgement,
  deletePolicy,
  editPolicy,
  uploadCreate,
};
export default PolicyServices;
