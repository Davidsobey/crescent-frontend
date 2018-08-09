import ModuleConstants from '../Constants/ModuleConstants';
import UserConstants from '../Constants/UserConstants';

function ModuleReducer(state = {}, action) {
  switch (action.type) {
    case ModuleConstants.CREATE_REQUEST:
      return Object.assign({}, state, {
        newModuleId: undefined,
        creating: true,
      });
    case ModuleConstants.CREATE_SUCCESS:
      return Object.assign({}, state, {
        newModuleId: action.newModuleId,
        creating: false,
      });
    case ModuleConstants.CREATE_FAILURE:
      return Object.assign({}, state, {
        newModuleId: undefined,
        creating: false,
      });
    case ModuleConstants.OPENREDIRECTMODAL_REQUEST:
      return Object.assign({}, state, {
        openRedirectModal: true,
      });
    case ModuleConstants.CLOSEREDIRECTMODAL_REQUEST:
      return Object.assign({}, state, {
        openRedirectModal: false,
      });

    case ModuleConstants.GETALL_REQUEST:
      return Object.assign({}, state, {
        modules: [],
        loading: true,
      });
    case ModuleConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        modules: action.modules,
        loading: false,
      });
    case ModuleConstants.GETALL_FAILURE:
      return Object.assign({}, state, {
        modules: [],
        loading: false,
      });
    case ModuleConstants.LOADMODULE_REQUEST:
      return Object.assign({}, state, {
        modules: [],
        loading: true,
      });
    case ModuleConstants.LOADMODULE_SUCCESS:
      return Object.assign({}, state, {
        modules: action.modules,
        loading: false,
      });
    case ModuleConstants.LOADMODULE_FAILURE:
      return {
        modules: [],
        loading: false,
      };
    case ModuleConstants.CLEAR_MODULES:
      return {};
    case ModuleConstants.MODULE_MATERIAL_REQUEST:
      return Object.assign({}, state, {
        loadingMaterial: true,
      });
    case ModuleConstants.MODULE_MATERIAL_SUCCESS:
      return Object.assign({}, state, {
        loadingMaterial: false,
        moduleMaterial: action.moduleMaterials,
      });
    case ModuleConstants.MODULE_MATERIAL_FAILURE:
      return Object.assign({}, state, { moduleMaterial: [] });

    case ModuleConstants.LOADTESTS_REQUEST:
      return Object.assign({}, state, {
        moduleTests: [],
        loadingTests: true,
      });
    case ModuleConstants.LOADTESTS_SUCCESS:
      return Object.assign({}, state, {
        moduleTests: action.moduleTests,
        loadingTests: false,
      });
    case ModuleConstants.LOADTESTS_FAILURE:
      return Object.assign({}, state, { 
        moduleTests: [],
        loadingTests: false,
      });
    case UserConstants.LOGOUT:
      return { 
        modules: [],
      };
    case ModuleConstants.LOAD_MODULE_REQUEST:
      return {
        module_loading: true,
      };
    case ModuleConstants.LOAD_MODULE_SUCCESS:
      return Object.assign({}, state, {
        module: action.module,
        module_loading: false,
      });
    case ModuleConstants.LOAD_MODULE_FAILURE:
      return {
        error: action.error,
        module_loading: false,
      };
    case ModuleConstants.DELETE_REQUEST:
      return state;
    case ModuleConstants.DELETE_SUCCESS:
      return Object.assign({}, state, {
        module: {},
        loading: false,
      });
    case ModuleConstants.DELETE_FAILURE:
      return Object.assign({}, state, {
        module: {},
        loading: false,
      });
    case ModuleConstants.EDIT_MODULE_REQUEST:
      return Object.assign({}, state, {
        module_editing: true,
      });
    case ModuleConstants.EDIT_MODULE_SUCCESS:
      return Object.assign({}, state, {
        module: undefined,
        module_editing: false,
      });
    case ModuleConstants.EDIT_MODULE_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        module_editing: false,
      });
    case ModuleConstants.UPLOAD_REQUEST:
      return Object.assign({}, state, {
        uploading: true,
      });
    case ModuleConstants.UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        uploading: false,
      });
    case ModuleConstants.UPLOAD_FAILURE:
      return Object.assign({}, state, {
        uploading: false,
      });
    default:
      return state;
  }
}

export default ModuleReducer;
