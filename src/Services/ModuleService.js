const fetch = require('isomorphic-fetch');

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
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

const ModuleServices = {
  create,
  getAll,
};
export default ModuleServices;
