import AuthHeader from '../Helpers/AuthHeader';
import CommonConstants from '../Constants/CommonConstants';

const fetch = require('isomorphic-fetch');

const api = CommonConstants.LIVE_API_ADDRESS;

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function login(username, password) {
  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      email: username,
      password,
    }),
  };

  return fetch(
    'https://crescenttesting.azurewebsites.net/api/Auth?',
    requestOptions,
  )
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user)); // eslint-disable-line no-undef
      }

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user'); // eslint-disable-line no-undef
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader(),
  };

  return fetch('https://crescenttesting.azurewebsites.net/api/Users', requestOptions)
    .then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${api}/Users/${id}`, requestOptions)
    .then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${api}/Users`, requestOptions)
    .then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...AuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${api}/Users/${user.id}`, requestOptions)
    .then(handleResponse);
}

function enrol(enrolment) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enrolment.courseID),
  };

  return fetch(`${api}/Users/${enrolment.userID}/enrolments`, requestOptions)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: AuthHeader(),
  };

  return fetch(`${api}/Users/${id}`, requestOptions)
    .then(handleResponse);
}

const UserService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: deleteUser,
  enrol,
};

export default UserService;
