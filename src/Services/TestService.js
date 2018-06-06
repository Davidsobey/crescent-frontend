import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function filteredList(response, id) {
  const objects = response.filter(obj => obj.moduleID === id);
  return objects;
}

function create(moduleID, testName, totalMarks) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      name: testName,
      moduleID,
      totalMarks,
    }),
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Tests`, requestOptions);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/Tests`, requestOptions);
}

function loadTest(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Tests/${id}`,
    requestOptions,
  );
}

function loadTestQuestions(userId, id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/EnrolmentTestQuestions/${userId}/${id}`,
    requestOptions,
  );
}

function markQuestion(id, answerGivenId) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({ id, answerGivenId }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/EnrolmentTestQuestions/${id}/Mark`,
    requestOptions,
  );
}

function submitTest(testId, courseId, userId) {
  const requestOptions = {
    method: 'POST',
  };

  return Auth.fetch(
    `${
      CommonConstants.API_ENDPOINT
    }/Tests/${testId}/EnrolmentTest/${courseId}/${userId}`,
    requestOptions,
  );
}

function editTest(values) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      id: parseInt(values.id, 10),
      name: values.name,
      totalMarks: values.totalMarks,
      moduleID: values.moduleID,
      active: true,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Tests/${values.id}`,
    requestOptions,
  );
}

function deleteTest(id) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Tests/Delete/${id}`,
    requestOptions,
  );
}

function getTests(id) {
  const requestOptions = {
    method: 'GET',
  };

  const objectList = Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/tests`,
    requestOptions,
  ).then(data => filteredList(data, id));

  return objectList;
}

const ModuleServices = {
  create,
  getAll,
  loadTest,
  loadTestQuestions,
  markQuestion,
  submitTest,
  editTest,
  deleteTest,
  getTests,
};
export default ModuleServices;
