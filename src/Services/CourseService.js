const fetch = require('isomorphic-fetch');

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

function create(courseName, courseDescription) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/Courses?Name=${courseName}&Description=${courseDescription}&CategoryId=1&Grade=0`,
    requestOptions,
  ).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    'https://crescenttesting.azurewebsites.net/api/Courses',
    requestOptions,
  ).then(handleResponse);
}

function getCourse(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/Courses/${id}`,
    requestOptions,
  ).then(handleResponse);
}

const CourseService = {
  create,
  getAll,
  getCourse,
};
export default CourseService;
