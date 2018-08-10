import PaymentConstants from '../Constants/PaymentConstants';
import PaymentService from '../Services/PaymentService';
import AlertActions from './AlertActions';

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
const PaymentActions = {
  getPaymentStatuses,
};

export default PaymentActions;
