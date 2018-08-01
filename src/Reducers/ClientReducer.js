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
      return {
        client: action.client,
      };
    case ClientConstants.CREATE_SUCCESS:
      return {
        client: action.client,
      };
    case ClientConstants.CREATE_FAILURE:
      return {};
    case ClientConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case ClientConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        clients: action.clients,
      });
    case ClientConstants.GETALL_FAILURE:
      return {
        clients: {},
      };
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
      return {
        subcription: action.subscription,
      };
    case ClientConstants.SUBSCRIBE_SUCCESS:
      return {
        subcription: action.subscription,
      };
    case ClientConstants.SUBSCRIBE_FAILURE:
      return {};
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
      return state;
    case ClientConstants.LOAD_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        client: action.client,
      });
    case ClientConstants.LOAD_CLIENT_FAILURE:
      return state;
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
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default ClientReducer;
