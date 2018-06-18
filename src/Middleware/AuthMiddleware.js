import React from 'react';
import decode from 'jwt-decode';
import CommonConstants from '../Constants/CommonConstants';

class AuthMiddleware extends React.Component {
  // Initializing important variables
  constructor(domain) {
    super();
    this.domain = domain || `${CommonConstants.API_ENDPOINT}`; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken.value);

    // Save attached user info to localStorage
    localStorage.setItem('userVM', idToken.userVM);
  }


  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/Auth`, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password,
      }),
    }).then((res) => {
      this.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  fetchMaterial(url, options) {
    const headers = {
      Accept: 'application/json',
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export default AuthMiddleware;
