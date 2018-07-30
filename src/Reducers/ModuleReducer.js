import ModuleConstants from '../Constants/ModuleConstants';
import UserConstants from '../Constants/UserConstants';

function ModuleReducer(state = {}, action) {
  switch (action.type) {
    case ModuleConstants.CREATE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case ModuleConstants.CREATE_SUCCESS:
      return Object.assign({}, state, {
        newModuleId: action.newModuleId,
        loading: false,
      });
    case ModuleConstants.CREATE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
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
      return {
        loading: true,
      };
    case ModuleConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        modules: action.modules,
      });
    case ModuleConstants.GETALL_FAILURE:
      return {
        modules: undefined,
      };
    case ModuleConstants.LOADMODULE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case ModuleConstants.LOADMODULE_SUCCESS:
      return Object.assign({}, state, {
        modules: action.modules,
        loading: false,
      });
    case ModuleConstants.LOADMODULE_FAILURE:
      return {
        modules: undefined,
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
        loadingTests: true,
      });
    case ModuleConstants.LOADTESTS_SUCCESS:
      return Object.assign({}, state, {
        loadingTests: false,
        moduleTests: action.moduleTests,
      });
    case ModuleConstants.LOADTESTS_FAILURE:
      return Object.assign({}, state, { moduleTests: [] });
    case UserConstants.LOGOUT:
      return {};
    case ModuleConstants.LOAD_MODULE_REQUEST:
      return state;
    case ModuleConstants.LOAD_MODULE_SUCCESS:
      return Object.assign({}, state, {
        module: action.module,
        loading: false,
      });
    case ModuleConstants.LOAD_MODULE_FAILURE:
      return state;
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
    case ModuleConstants.EDIT_MODULE_SUCCESS:
      return Object.assign({}, state, {
        module: undefined,
        loading: false,
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
