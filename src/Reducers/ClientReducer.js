import ClientConstants from '../Constants/ClientConstants';
import UserConstants from '../Constants/UserConstants';

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
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default ClientReducer;
