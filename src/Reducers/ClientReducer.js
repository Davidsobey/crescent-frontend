import { isNumber } from 'util';
import ClientConstants from '../Constants/ClientConstants';
import UserConstants from '../Constants/UserConstants';

function filterById(id, delId) {
  if (isNumber(id) && id !== 0 && id !== delId) {
    return true;
  }
  return false;
}

function ClientReducer(state = {}, action) {
  switch (action.type) {
    case ClientConstants.CREATE_REQUEST:
      return Object.assign({}, state, {
        client: action.client,
        creating: true,
      });
    case ClientConstants.CREATE_SUCCESS:
      return Object.assign({}, state, {
        client: action.client,
        newClientId: action.client.id,
        clientRoleId: action.clientRoleId,
        creating: false,
      });
    case ClientConstants.CREATE_FAILURE:
      return Object.assign({}, state, {
        creating: false,
      });
    case ClientConstants.GETALL_REQUEST:
      return Object.assign({}, state, {
        clients: [],
        loading: true,
      });
    case ClientConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        clients: action.clients,
        loading: false,
      });
    case ClientConstants.GETALL_FAILURE:
      return Object.assign({}, state, {
        clients: [],
        loading: false,
      });
    case ClientConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case ClientConstants.GETBYID_SUCCESS:
      return Object.assign({}, state, {
        client: action.client,
      });
    case ClientConstants.GETBYID_FAILURE:
      return {
        client: {},
      };
    case ClientConstants.SUBSCRIBE_REQUEST:
      return Object.assign({}, state, {
        subcription: action.subscription,
        subscribing: true,
      });
    case ClientConstants.SUBSCRIBE_SUCCESS:
      return Object.assign({}, state, {
        subcription: action.subscription,
        subscribing: false,
      });
    case ClientConstants.SUBSCRIBE_FAILURE:
      return Object.assign({}, state, {
        subscribing: false,
      });
    case ClientConstants.DELETE_REQUESTS:
      return {
        loading: true,
      };
    case ClientConstants.DELETE_SUCCESSS:
      return Object.assign({}, state, {
        clients: state.clients.filter(obj => filterById(obj.id, action.id)),
        loading: false,
      });
    case ClientConstants.DELETE_FAILURES:
      return state;
    case ClientConstants.LOAD_CLIENT_REQUEST:
      return {
        client_loading: true,
      };
    case ClientConstants.LOAD_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        client: action.client,
        client_loading: false,
      });
    case ClientConstants.LOAD_CLIENT_FAILURE:
      return {
        error: action.error,
        client_loading: false,
      };
    case ClientConstants.GETUSERENROLMENTS_REQUEST:
      return Object.assign({}, state, {
        userEnrolments: [],
        loading: true,
      });
    case ClientConstants.GETUSERENROLMENTS_SUCCESS:
      return Object.assign({}, state, {
        userEnrolments: action.userEnrolments,
        loading: false,
      });
    case ClientConstants.GETUSERENROLMENTS_FAILURE:
      return Object.assign({}, state, {
        userEnrolments: [],
        loading: false,
      });
    case ClientConstants.GETSUBSCRIPTIONS_REQUEST:
      return Object.assign({}, state, {
        subscriptions: [],
        subscriptions_loading: true,
      });
    case ClientConstants.GETSUBSCRIPTIONS_SUCCESS:
      return Object.assign({}, state, {
        subscriptions: action.subscriptions,
        subscriptions_loading: false,
      });
    case ClientConstants.GETSUBSCRIPTIONS_FAILURE:
      return Object.assign({}, state, {
        subscriptions: [],
        subscriptions_loading: false,
      });
    case ClientConstants.EDIT_REQUEST:
      return {
        client_editing: true,
      };
    case ClientConstants.EDIT_SUCCESS:
      return {
        client_editing: false,
      };
    case ClientConstants.EDIT_FAILURE:
      return {
        error: action.error,
        client_editing: false,
      };
    case ClientConstants.CLEAR_CLIENTS:
      return {};
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default ClientReducer;
