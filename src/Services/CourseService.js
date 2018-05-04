import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function create(courseName, courseDescription, courseCPD) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      Name: courseName,
      Description: courseDescription,
      cpdPoints: parseInt(courseCPD, 10),
    }),
  };
  return Auth.fetch(`${CommonConstants.LIVE_PROD_ADDRESS}/Courses`, requestOptions);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.LIVE_PROD_ADDRESS}/Courses`, requestOptions);
}

function getCourse(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.LIVE_PROD_ADDRESS}/Courses/${id}`, requestOptions);
}

function editCourse(values) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      id: parseInt(values.id, 10),
      name: values.name,
      description: values.description,
      cpdPoints: parseInt(values.cpdPoints, 10),
    }),
  };

  return Auth.fetch(`${CommonConstants.LIVE_PROD_ADDRESS}/Courses/${values.id}`, requestOptions);
}

function deleteCourse(id) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(`${CommonConstants.LIVE_PROD_ADDRESS}/Courses/Delete/${id}`, requestOptions);
}

const CourseService = {
  create,
  getAll,
  getCourse,
  deleteCourse,
  editCourse,
};
export default CourseService;
