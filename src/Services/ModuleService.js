const fetch = require('isomorphic-fetch');
require('babel-core/register');
require('babel-polyfill');

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

function getModuleMaterial(ids) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const materialDetails = [];

  let count = 0;

  function* fetchNow() {
    yield fetch(
      `https://crescenttesting.azurewebsites.net/api/Materials/${ids[count]}`,
      requestOptions,
    )
      .then(handleResponse)
      .then((material) => {
        if (ids.length - 1 === count) {
          return materialDetails;
        }
        materialDetails.push(material);
        count += 1;
        fetchNow();
        return materialDetails;
      });
  }
  fetchNow();
  return materialDetails;
}

const ModuleServices = {
  create,
  getAll,
  getModules,
  getModuleMaterial,
};
export default ModuleServices;
