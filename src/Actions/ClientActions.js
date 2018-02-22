import ClientConstants from '../Constants/ClientConstants';
import ClientService from '../Services/ClientService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(client) {
  function request() {
    return { type: ClientConstants.CREATE_REQUEST, client };
  }
  function success() {
    return { type: ClientConstants.CREATE_SUCCESS, client };
  }
  function failure(error) {
    return { type: ClientConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ client }));
    ClientService.create(client).then(
      () => {
        dispatch(success(client));
        history.push('/client/list');
        dispatch(AlertActions.success('Client created.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function subscribe(subscription) {
  function request() {
    return { type: ClientConstants.SUBSCRIBE_REQUEST, subscription };
  }
  function success() {
    return { type: ClientConstants.SUBSCRIBE_SUCCESS, subscription };
  }
  function failure(error) {
    return { type: ClientConstants.SUBSCRIBE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ subscription }));
    ClientService.subscribe(subscription).then(
      () => {
        dispatch(success(subscription));
        history.push(`/client/${subscription.clientId}.list`);
        dispatch(AlertActions.success('Subscription created.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getById(id) {
  function request() {
    return { type: ClientConstants.GETBYID_REQUEST };
  }
  function success(client) {
    return { type: ClientConstants.GETBYID_SUCCESS, client };
  }
  function failure(error) {
    return { type: ClientConstants.GETBYID_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ClientService.getById(id).then(
      client => dispatch(success(client)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getAll() {
  function request() {
    return { type: ClientConstants.GETALL_REQUEST };
  }
  function success(clients) {
    return { type: ClientConstants.GETALL_SUCCESS, clients };
  }
  function failure(error) {
    return { type: ClientConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ClientService.getAll().then(
      clients => dispatch(success(clients)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

const clientActions = {
  create,
  getAll,
  getById,
  subscribe,
};

export default clientActions;