const fetch = require('isomorphic-fetch');

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

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/Modules?Name=${moduleName}&Description=${moduleDescription}&CourseId=${courseID}`,
    requestOptions,
  ).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    'https://crescenttesting.azurewebsites.net/api/Modules',
    requestOptions,
  ).then(handleResponse);
}

function getModules(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const objectList = fetch(
    'https://crescenttesting.azurewebsites.net/api/Modules',
    requestOptions,
  )
    .then(handleResponse)
    .then(data => filteredList(data, id));

  return objectList;
}

function loadTests(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/Modules/${id}/Tests`,
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

  return fetch(
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

function getModuleMaterial(ids) {
  materialDetails = processArray(ids);
  return materialDetails;
}

const ModuleServices = {
  create,
  getAll,
  getModules,
  getModuleMaterial,
  loadTests,
};
export default ModuleServices;
