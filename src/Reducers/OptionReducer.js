import OptionConstants from '../Constants/OptionConstants';
import UserConstants from '../Constants/UserConstants';

function OptionReducer(state = {}, action) {
  switch (action.type) {
    case OptionConstants.CREATE_REQUEST:
      return {
        Options: action.OptionName,
      };
    case OptionConstants.CREATE_SUCCESS:
      return {
        Options: action.OptionName,
      };
    case OptionConstants.CREATE_FAILURE:
      return {};
    case OptionConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case OptionConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        Options: action.Options,
      });
    case OptionConstants.GETALL_FAILURE:
      return {
        Options: {},
      };
    case OptionConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case OptionConstants.GETBYID_SUCCESS:
      return Object.assign({}, state, {
        Options: action.Options,
      });
    case OptionConstants.GETBYID_FAILURE:
      return {
        Options: {},
      };
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default OptionReducer;
