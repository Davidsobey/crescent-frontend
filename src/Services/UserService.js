import AuthHeader from '../Helpers/AuthHeader';
import CommonConstants from '../Constants/CommonConstants';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const Auth = new AuthMiddleware();

const fetch = require('isomorphic-fetch');

const api = CommonConstants.LIVE_API_ADDRESS;

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function login(username, password) {
  return Auth.login(username, password);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  };

  return fetch(
    'https://crescenttesting.azurewebsites.net/api/Users',
    requestOptions,
  ).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/Users/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${api}/Users`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...AuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${api}/Users/${user.id}`, requestOptions).then(handleResponse);
}

function enrol(enrolment) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enrolment.courseID),
  };

  return fetch(
    `${api}/Users/${enrolment.userID}/enrolments`,
    requestOptions,
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: AuthHeader(),
  };

  return fetch(`${api}/Users/${id}`, requestOptions).then(handleResponse);
}

function logout() {
  localStorage.clear();
}

const UserService = {
  login,
  register,
  getAll,
  getById,
  update,
  delete: deleteUser,
  enrol,
  logout,
};

export default UserService;
