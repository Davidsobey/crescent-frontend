import FormData from 'form-data';

import CommonConstants from '../Constants/CommonConstants';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const Auth = new AuthMiddleware();
const api = CommonConstants.API_ENDPOINT;

// get material by ID
function getByID(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(`${api}/Materials/${id}`, requestOptions);
}

// get policy material by ID
function getPolicyMaterialByID(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(`${api}/PolicyMaterials/${id}`, requestOptions);
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

  return Auth.fetchMaterial(`${api}/Materials`, requestOptions);
}

// post new policy material with file upload
function uploadPolicyMaterial(policyId, file) {
  const fd = new FormData();
  fd.append('PolicyId', policyId);
  fd.append('FormFile', file);
  const requestOptions = {
    method: 'POST',
    body: fd,
  };

  return Auth.fetchMaterial(`${api}/PolicyMaterials`, requestOptions);
}

const ModuleServices = {
  getByID,
  upload,
  uploadPolicyMaterial,
  getPolicyMaterialByID,
};
export default ModuleServices;
