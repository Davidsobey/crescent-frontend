import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function create(question) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      title: question.questionTitle,
      allocatedMarks: question.questionAllocatedMarks,
      testId: question.test,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions`,
    requestOptions,
  );
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions`,
    requestOptions,
  );
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/${id}`,
    requestOptions,
  );
}

function update(question) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(question),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/${question.id}`,
    requestOptions,
  );
}

function deleteQuestion(id) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/Questions/Delete/${id}`,
    requestOptions,
  );
}

const QuestionServices = {
  create,
  getAll,
  getById,
  update,
  deleteQuestion,
};

export default QuestionServices;
