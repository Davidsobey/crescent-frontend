import CommonConstants from '../Constants/CommonConstants';

const FormData = require('form-data');
const fetch = require('isomorphic-fetch');

const api = CommonConstants.LIVE_API_ADDRESS;

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

// get material by ID
function getByID(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${api}/Materials/${id}`, requestOptions)
    .then(handleResponse);
}

// post new material with file upload
function upload(moduleId, file) {
  const fd = new FormData();
  fd.append('ModuleId', moduleId);
  fd.append('FormFile', file);
  const requestOptions = {
    method: 'POST',
    body: fd,
  };

  return fetch(
    `${api}/Materials`,
    requestOptions,
  ).then(handleResponse);
}

const ModuleServices = {
  getByID,
  upload,
};
export default ModuleServices;
