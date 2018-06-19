import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function create(questionId, title, isAnswer) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      title,
      isAnswer,
      questionId,
    }),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/QuestionOptions`,
    requestOptions,
  );
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/QuestionOptions`,
    requestOptions,
  );
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/QuestionOptions/${id}`,
    requestOptions,
  );
}

function update(option) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(option),
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/QuestionOptions/${option.id}`,
    requestOptions,
  );
}

const OptionServices = {
  create,
  getAll,
  getById,
  update,
};

export default OptionServices;
