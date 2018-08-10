import PaymentConstants from '../Constants/PaymentConstants';
import UserConstants from '../Constants/UserConstants';

function PaymentReducer(state = {}, action) {
  switch (action.type) {
    case PaymentConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case PaymentConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        paymentStatuses: action.paymentStatuses,
        loading: false,
      });
    case PaymentConstants.GETALL_FAILURE:
      return {
        paymentStatuses: {},
        loading: false,
      };
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default PaymentReducer;
