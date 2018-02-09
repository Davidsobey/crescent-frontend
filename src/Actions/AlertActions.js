import AlertConstants from '../Constants/AlertConstants';

function success(message) {
  return { type: AlertConstants.SUCCESS, message };
}

function error(message) {
  return { type: AlertConstants.ERROR, message };
}

function clear() {
  return { type: AlertConstants.CLEAR };
}

const AlertActions = {
  success,
  error,
  clear,
};

export default AlertActions;
