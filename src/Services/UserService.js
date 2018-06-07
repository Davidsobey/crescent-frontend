import AuthHeader from '../Helpers/AuthHeader';
import CommonConstants from '../Constants/CommonConstants';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const Auth = new AuthMiddleware();

function login(username, password) {
  return Auth.login(username, password);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Users`, requestOptions);
}

function getAllRoles() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Roles`, requestOptions);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Users/${id}`,
    requestOptions,
  );
}

function register(user) {
  const newUser = { ...user, password: 'changeMe!' };
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(newUser),
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Users`, requestOptions);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...AuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Users/${user.id}`,
    requestOptions,
  );
}

function enrol(enrolment) {
  const requestOptions = {
    method: 'POST',
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Users/${enrolment.userID}/enrolments?courseId=${enrolment.courseID}`,
    requestOptions,
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Users/Delete/${id}`,
    requestOptions,
  );
}

function editUser(values) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      id: parseInt(values.id, 10),
      name: values.name,
      email: values.email,
      roleId: values.roleId,
      clientId: values.clientId,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Users/${values.id}`,
    requestOptions,
  );
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
  deleteUser,
  enrol,
  logout,
  getAllRoles,
  editUser,
};

export default UserService;
