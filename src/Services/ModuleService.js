import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function filteredList(response, id) {
  const objects = response.filter(obj => obj.courseId === id);
  return objects;
}

function create(courseID, moduleName, moduleDescription) {
  const requestOptions = {
    method: 'POST',
    // body: JSON.stringify({
    //   name: courseName,
    //   description: courseDescription,
    //   category: 1,
    //   grade: 0,
    //   enrolledUserIds: null
    // })
  };

  return Auth.fetch(
    `${
      CommonConstants.API_ENDPOINT
    }/Modules?Name=${moduleName}&Description=${moduleDescription}&CourseId=${courseID}`,
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
    `${CommonConstants.API_ENDPOINT}/Materials/${item}`,
    requestOptions,
  );
}

async function processArray(array) {
  materialDetails = [];
  const promises = array.map(delayedLog);
  const a = await Promise.all(promises).then(result => result);
  return a;
}

function getModuleMaterial(ids) {
  materialDetails = processArray(ids);
  return materialDetails;
}

function getModule(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Modules/${id}`,
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
  getModuleMaterial,
  loadTests,
  getModule,
  editModule,
  deleteModule,
};
export default ModuleServices;
