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
    case ModuleConstants.LOADMODULE_REQUEST:
      return {
        loading: true,
      };
    case ModuleConstants.LOADMODULE_SUCCESS:
      return Object.assign({}, state, {
        modules: action.modules,
        loading: false,
      });
    case ModuleConstants.LOADMODULE_FAILURE:
      return {
        modules: {},
      };
    case ModuleConstants.CLEAR_MODULES:
      return {
        modules: undefined,
      };
    case ModuleConstants.MODULE_MATERIAL_REQUEST:
      return Object.assign({}, state, { moduleMaterial: {} });
    case ModuleConstants.MODULE_MATERIAL_SUCCESS:
      return Object.assign({}, state, {
        moduleMaterial: action.moduleMaterial,
      });
    case ModuleConstants.MODULE_MATERIAL_FAILURE:
      return Object.assign({}, state, { moduleMaterial: {} });
    default:
      return state;
  }
}

export default ModuleReducer;
