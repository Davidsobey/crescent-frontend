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
function upload(material, file) {
  const fd = new FormData();
  fd.append('ModuleMaterialID', material.id);
  fd.append('FormFile', file);
  fd.append('Active', true);

  const requestOptions = {
    method: 'POST',
    body: fd,
  };

  return Auth.fetchMaterial(`${api}/Materials/UploadFile`, requestOptions);
}

function uploadCreate(ModuleId) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      ModuleId,
    }),
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Materials`,
    requestOptions,
  );
}

// post new policy material with file upload
function uploadPolicyMaterial(policy, file) {
  const fd = new FormData();
  fd.append('PolicyMaterialID', policy.id);
  fd.append('FormFile', file);
  fd.append('Active', true);
  const requestOptions = {
    method: 'POST',
    body: fd,
  };

  return Auth.fetchMaterial(
    `${api}/PolicyMaterials/UploadFile`,
    requestOptions,
  );
}

const ModuleServices = {
  getByID,
  upload,
  uploadCreate,
  uploadPolicyMaterial,
  getPolicyMaterialByID,
};
export default ModuleServices;
