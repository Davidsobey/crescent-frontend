import ModuleConstants from '../Constants/ModuleConstants';

function ModuleReducer(state = {}, action) {
  switch (action.type) {
    case ModuleConstants.CREATE_REQUEST:
      return {
        modules: action.moduleName,
      };
    case ModuleConstants.CREATE_SUCCESS:
      return {
        modules: action.moduleName,
      };
    case ModuleConstants.CREATE_FAILURE:
      return {};
    case ModuleConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case ModuleConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        modules: action.modules,
      });
    case ModuleConstants.GETALL_FAILURE:
      return {
        modules: {},
      };
    default:
      return state;
  }
}

export default ModuleReducer;
