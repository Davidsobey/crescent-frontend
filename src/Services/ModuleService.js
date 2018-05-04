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
    headers: { 'Content-Type': 'application/json' },
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
      CommonConstants.LIVE_PROD_ADDRESS
    }/Modules?Name=${moduleName}&Description=${moduleDescription}&CourseId=${courseID}`,
    requestOptions,
  );
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Modules`,
    requestOptions,
  );
}

function getModules(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const objectList = Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Modules`,
    requestOptions,
  ).then(data => filteredList(data, id));

  return objectList;
}

function loadTests(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Modules/${id}/Tests`,
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
    headers: { 'Content-Type': 'application/json' },
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Materials/${item}`,
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
    `${CommonConstants.LIVE_PROD_ADDRESS}/Modules/${id}`,
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
    }),
  };

  return Auth.fetch(
    `${CommonConstants.LIVE_PROD_ADDRESS}/Modules/${values.id}`,
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
};
export default ModuleServices;
