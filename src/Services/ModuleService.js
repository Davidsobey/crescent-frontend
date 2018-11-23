import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function filteredList(response, id) {
  const objects = response.filter(obj => obj.courseId === id);
  return objects;
}

function create(CourseId, moduleName, moduleDescription) {
  if (moduleDescription === null || moduleDescription === undefined) {
    // eslint-disable-next-line no-param-reassign
    moduleDescription = `This module covers ${moduleName}`;
  }
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      name: moduleName,
      description: moduleDescription,
      CourseId,
    }),
  };

  return Auth.fetch(
    `${
      CommonConstants.API_ENDPOINT
    }/Modules`,
    requestOptions,
  );
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Modules`, requestOptions);
}

function getModules(id) {
  const requestOptions = {
    method: 'GET',
  };

  const objectList = Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Modules`,
    requestOptions,
  ).then(data => filteredList(data, id));

  return objectList;
}

function loadTests(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Modules/${id}/Tests`,
    requestOptions,
  );
}

// function delay() {
//   return new Promise(resolve => setTimeout(resolve, 300));
// }

// async function delayedLog(item) {
//   await delay();
//   const requestOptions = {
//     method: 'GET',
//   };

//   return Auth.fetch(
//     `${CommonConstants.API_ENDPOINT}/Materials/${item}`,
//     requestOptions,
//   );
// }

function getModule(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Modules/${id}`,
    requestOptions,
  );
}

function getMaterialsForModule(moduleId) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Modules/${moduleId}/Materials`,
    requestOptions,
  );
}

function editModule(values) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      id: parseInt(values.id, 10),
      name: values.name,
      description: values.description,
      courseId: values.courseId,
      active: true,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Modules/${values.id}`,
    requestOptions,
  );
}

function deleteModule(id) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Modules/Delete/${id}`,
    requestOptions,
  );
}

const ModuleServices = {
  create,
  getAll,
  getModules,
  getMaterialsForModule,
  loadTests,
  getModule,
  editModule,
  deleteModule,
};
export default ModuleServices;
