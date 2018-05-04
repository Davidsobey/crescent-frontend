import AlertConstants from '../Constants/AlertConstants';
import UserConstants from '../Constants/UserConstants';

function AlertReducer(state = {}, action) {
  switch (action.type) {
    case AlertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message:
          typeof action.message === 'string'
            ? action.message
            : action.message.message,
        open: true,
      };
    case AlertConstants.ERROR:
      return {
        type: 'alert-danger',
        message:
          typeof action.message === 'string'
            ? action.message
            : action.message.message,
        open: true,
      };
    case AlertConstants.CLEAR:
      return { open: false };
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default AlertReducer;
