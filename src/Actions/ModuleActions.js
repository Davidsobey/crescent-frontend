import ModuleConstants from '../Constants/ModuleConstants';
import CourseConstants from '../Constants/CourseConstants';
import ModuleService from '../Services/ModuleService';
import MaterialService from '../Services/MaterialService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(courseID, moduleName, moduleDescription) {
  function request() {
    return { type: ModuleConstants.CREATE_REQUEST, moduleName };
  }
  function success(newModuleId) {
    return { type: ModuleConstants.CREATE_SUCCESS, newModuleId };
  }
  function failure(error) {
    return { type: ModuleConstants.CREATE_FAILURE, error };
  }
  function openmodal_request() {
    return { type: ModuleConstants.OPENREDIRECTMODAL_REQUEST };
  }
  function course_success(newCourseId) {
    return { type: CourseConstants.CREATE_SUCCESS, newCourseId };
  }

  return (dispatch) => {
    dispatch(request({ moduleName }));
    ModuleService.create(courseID, moduleName, moduleDescription).then(
      (module) => {
        console.log('module', module);
        dispatch(success(module.id));
        dispatch(course_success(module.courseId));
        dispatch(openmodal_request());
        // dispatch(AlertActions.success(`Module ${moduleName} created.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

function closeRedirectModal() {
  function request() {
    return { type: ModuleConstants.CLOSEREDIRECTMODAL_REQUEST };
  }

  return (dispatch) => {
    dispatch(request());
  };
}

function getAll() {
  function request() {
    return { type: ModuleConstants.GETALL_REQUEST };
  }
  function success(modules) {
    return { type: ModuleConstants.GETALL_SUCCESS, modules };
  }
  function failure(error) {
    return { type: ModuleConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ModuleService.getAll().then(
      modules => dispatch(success(modules)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}
// testing
function uploadMaterial(moduleId, file) {
  function request() {
    return { type: ModuleConstants.UPLOAD_REQUEST };
  }
  function success() {
    return { type: ModuleConstants.UPLOAD_SUCCESS };
  }
  function failure(error) {
    return { type: ModuleConstants.UPLOAD_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    MaterialService.uploadCreate(moduleId).then(
      (materialId) => {
        dispatch(success());
        MaterialService.upload(materialId, file).then(
          () => {
            history.push('/module/list');
            dispatch(AlertActions.success('Material created successfully.'));
          },
          (error) => {
            dispatch(failure(error));
            dispatch(AlertActions.error(error || error));
          },
        );
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

function loadModuleByCourse(id) {
  function request() {
    return { type: ModuleConstants.LOADMODULE_REQUEST };
  }
  function success(modules) {
    return { type: ModuleConstants.LOADMODULE_SUCCESS, modules };
  }
  function failure(error) {
    return { type: ModuleConstants.LOADMODULE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ModuleService.getModules(id).then(
      modules => dispatch(success(modules)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

function moduleMaterial(moduleId) {
  function request() {
    return { type: ModuleConstants.MODULE_MATERIAL_REQUEST };
  }
  function success(moduleMaterials) {
    return { type: ModuleConstants.MODULE_MATERIAL_SUCCESS, moduleMaterials };
  }
  function failure(error) {
    return { type: ModuleConstants.MODULE_MATERIAL_REQUEST, error };
  }

  return (dispatch) => {
    dispatch(request());

    ModuleService.getModuleMaterial(moduleId).then(
      moduleMaterials => dispatch(success(moduleMaterials)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

function deleteModule(id) {
  function request() {
    return { type: ModuleConstants.DELETE_MODULE_REQUEST };
  }
  function success() {
    return { type: ModuleConstants.DELETE_MODULE_SUCCESS };
  }
  function failure(error) {
    return { type: ModuleConstants.DELETE_MODULE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    ModuleService.deleteModule(id).then(
      () => dispatch(success()),
      dispatch(AlertActions.success('Module deleted successfully.')),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

function loadModuleTests(id) {
  function request() {
    return { type: ModuleConstants.LOADTESTS_REQUEST };
  }
  function success(moduleTests) {
    return { type: ModuleConstants.LOADTESTS_SUCCESS, moduleTests };
  }
  function failure(error) {
    return { type: ModuleConstants.LOADTESTS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    ModuleService.loadTests(id).then(
      moduleTests => dispatch(success(moduleTests)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error || error));
      },
    );
  };
}

function clearModules() {
  function clear() {
    return { type: ModuleConstants.CLEAR_MODULES };
  }
  return (dispatch) => {
    dispatch(clear());
  };
}

function loadModule(id) {
  function request() {
    return { type: ModuleConstants.LOAD_MODULE_REQUEST };
  }
  function success(module) {
    return { type: ModuleConstants.LOAD_MODULE_SUCCESS, module };
  }
  function failure(error) {
    return { type: ModuleConstants.LOAD_MODULE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    ModuleService.getModule(id).then(
      (module) => {
        dispatch(success(module));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function editModule(values) {
  function success() {
    return { type: ModuleConstants.EDIT_MODULE_SUCCESS };
  }
  return (dispatch) => {
    ModuleService.editModule(values).then(
      () => {
        dispatch(success());
        history.push('/test/create');
        dispatch(AlertActions.success(`Module ${values.name} edited.`));
      },
      (error) => {
        dispatch(AlertActions.error(error));
      },
    );
  };
}

const ModuleActions = {
  create,
  closeRedirectModal,
  getAll,
  uploadMaterial,
  loadModuleByCourse,
  clearModules,
  moduleMaterial,
  loadModuleTests,
  deleteModule,
  loadModule,
  editModule,
};

export default ModuleActions;
