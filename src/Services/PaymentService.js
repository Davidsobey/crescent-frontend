import AuthMiddleware from '../Middleware/AuthMiddleware';
import CommonConstants from '../Constants/CommonConstants';

const Auth = new AuthMiddleware();

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/PaymentStatuses`,
    requestOptions,
  );
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
  };

  return Auth.fetch(
    `${CommonConstants.API_ENDPOINT}/PaymentStatuses/${id}`,
    requestOptions,
  );
}

function changePaymentStatus(clientId, courseId) {
  const requestOptions = {
    method: 'PUT',
  };
  return Auth.fetch(`${CommonConstants.API_ENDPOINT}/PaymentStatuses/${clientId}/${courseId}`, requestOptions);
}

const PaymentServices = {
  getAll,
  getById,
  changePaymentStatus,
};

export default PaymentServices;
