import PaymentConstants from '../Constants/PaymentConstants';
import PaymentService from '../Services/PaymentService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function getPaymentStatuses() {
  function request() {
    return { type: PaymentConstants.GETALL_REQUEST };
  }
  function success(paymentStatuses) {
    return { type: PaymentConstants.GETALL_SUCCESS, paymentStatuses };
  }
  function failure(error) {
    return { type: PaymentConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    PaymentService.getAll().then(
      paymentStatuses => dispatch(success(paymentStatuses)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function changePaymentStatus(clientId, courseId) {
  function request() {
    return { type: PaymentConstants.CHANGE_PAYMENT_STATUS_REQUEST };
  }
  function success() {
    return { type: PaymentConstants.CHANGE_PAYMENT_STATUS_SUCCESS };
  }
  function failure(error) {
    return { type: PaymentConstants.CHANGE_PAYMENT_STATUS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    PaymentService.changePaymentStatus(clientId, courseId).then(
      () => {
        history.push('/admin/home');
        dispatch(success());
        dispatch(AlertActions.success('Payment Status Updated'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}
const PaymentActions = {
  getPaymentStatuses,
  changePaymentStatus,
};

export default PaymentActions;
