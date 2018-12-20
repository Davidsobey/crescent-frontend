import ClientConstants from '../Constants/ClientConstants';
import CourseConstants from '../Constants/CourseConstants';
import ClientService from '../Services/ClientService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(client, clientRoleId) {
  function request() {
    return { type: ClientConstants.CREATE_REQUEST, client };
  }
  function success(c) {
    return { type: ClientConstants.CREATE_SUCCESS, c, clientRoleId };
  }
  function failure(error) {
    return { type: ClientConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ client }));
    ClientService.create(client).then(
      (c) => {
        dispatch(success(c));
        history.push('/user/create');
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
  function courseSuccess(newCourseId) {
    return { type: CourseConstants.CREATE_SUCCESS, newCourseId };
  }

  return (dispatch) => {
    dispatch(request({ subscription }));
    ClientService.subscribe(subscription).then(
      () => {
        history.push('/user/enrol');
        dispatch(courseSuccess(subscription.courseID));
        dispatch(success(subscription));
        dispatch(AlertActions.success('Subscription created.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function subscribeAll(clientId) {
  function request() {
    return { type: ClientConstants.SUBSCRIBE_ALL_REQUEST };
  }
  function success(client) {
    return { type: ClientConstants.SUBSCRIBE_ALL_SUCCESS, client };
  }
  function failure(error) {
    return { type: ClientConstants.SUBSCRIBE_ALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ clientId }));
    ClientService.subscribeAll(clientId).then(
      (client) => {
        dispatch(success(client));
        dispatch(AlertActions.success('Subscribed to all courses.'));
        history.push('/user/enrol');
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}


function subscribeSilent(subscription) {
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
      },
      (error) => {
        dispatch(failure(error));
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

function deleteClient(id) {
  function request() {
    return { type: ClientConstants.DELETE_CLIENT_REQUEST, id };
  }
  function success() {
    return { type: ClientConstants.DELETE_CLIENT_SUCCESS, id };
  }
  function failure(error) {
    return { type: ClientConstants.DELETE_CLIENT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ClientService.deleteClient(id).then(
      () => {
        history.push('/client/list');
        dispatch(success(id));
        dispatch(AlertActions.success('Client deleted.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function loadClient(id) {
  function request() {
    return { type: ClientConstants.LOAD_CLIENT_REQUEST };
  }
  function success(client) {
    return { type: ClientConstants.LOAD_CLIENT_SUCCESS, client };
  }
  function failure(error) {
    return { type: ClientConstants.LOAD_CLIENT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ClientService.getClient(id).then(
      (client) => {
        dispatch(success(client));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function editClient(values) {
  function request() {
    return { type: ClientConstants.EDIT_REQUEST };
  }
  function success() {
    return { type: ClientConstants.EDIT_SUCCESS };
  }
  function failure(error) {
    return { type: ClientConstants.EDIT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ClientService.editClient(values).then(
      () => {
        history.push('/client/list');
        dispatch(success());
        dispatch(AlertActions.success(`Client ${values.name} edited.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getUserEnrolments(id) {
  function request() {
    return { type: ClientConstants.GETUSERENROLMENTS_REQUEST };
  }
  function success(userEnrolments) {
    return { type: ClientConstants.GETUSERENROLMENTS_SUCCESS, userEnrolments };
  }
  function failure(error) {
    return { type: ClientConstants.GETUSERENROLMENTS_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request());

    ClientService.getUserEnrolments(id).then(
      userEnrolments => dispatch(success(userEnrolments)),
      error => dispatch(failure(error)),
    );
  };
}

function getSubscriptions() {
  function request() {
    return { type: ClientConstants.GETSUBSCRIPTIONS_REQUEST };
  }
  function success(subscriptions) {
    return { type: ClientConstants.GETSUBSCRIPTIONS_SUCCESS, subscriptions };
  }
  function failure(error) {
    return { type: ClientConstants.GETSUBSCRIPTIONS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ClientService.getSubscriptions().then(
      subscriptions => dispatch(success(subscriptions)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function clearClients() {
  function clear() {
    return { type: ClientConstants.CLEAR_CLIENTS };
  }
  return (dispatch) => {
    dispatch(clear());
  };
}

const clientActions = {
  create,
  getAll,
  getById,
  subscribe,
  subscribeSilent,
  subscribeAll,
  deleteClient,
  loadClient,
  editClient,
  getUserEnrolments,
  getSubscriptions,
  clearClients,
};

export default clientActions;
