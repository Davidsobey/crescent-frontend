import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function create(courseName, courseDescription, cpdHours) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      Name: courseName,
      Description: courseDescription,
      cpdHours: parseInt(cpdHours, 10),
      active: true,
    }),
  };
  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Courses`, requestOptions);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Courses`, requestOptions);
}

function getAllUnsubscribedCourses(clientId) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Courses/Unsubscribed/${clientId}`, requestOptions);
}

function getCourse(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Courses/${id}`, requestOptions);
}

function editCourse(values) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      id: parseInt(values.id, 10),
      name: values.name,
      description: values.description,
      cpdHours: parseInt(values.cpdHours, 10),
    }),
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Courses/${values.id}`, requestOptions);
}

function deleteCourse(id) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Courses/Delete/${id}`, requestOptions);
}

const CourseService = {
  create,
  getAll,
  getCourse,
  deleteCourse,
  editCourse,
  getAllUnsubscribedCourses,
};
export default CourseService;
