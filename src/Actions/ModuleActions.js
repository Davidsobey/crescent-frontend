import ModuleConstants from '../Constants/ModuleConstants';
import ModuleService from '../Services/ModuleService';
import MaterialService from '../Services/MaterialService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(courseID, moduleName, moduleDescription) {
  function request() {
    return { type: ModuleConstants.CREATE_REQUEST, moduleName };
  }
  function success() {
    return { type: ModuleConstants.CREATE_SUCCESS, moduleName };
  }
  function failure(error) {
    return { type: ModuleConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ moduleName }));
    ModuleService.create(courseID, moduleName, moduleDescription).then(
      () => {
        dispatch(success(moduleName));
        history.push('/module/list');
        dispatch(AlertActions.success(`Module ${moduleName} created.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
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
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function uploadMaterial(moduleId, file) {
  function request() {
    return { type: ModuleConstants.UPLOAD_REQUEST, file };
  }
  function success() {
    return { type: ModuleConstants.UPLOAD_SUCCESS, file };
  }
  function failure(error) {
    return { type: ModuleConstants.UPLOAD_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ file }));
    MaterialService.upload(moduleId, file).then(
      () => {
        dispatch(success(file));
        history.push('/module/material/list');
        dispatch(AlertActions.success('Material created successfully.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

const ModuleActions = {
  create,
  getAll,
  uploadMaterial,
};

export default ModuleActions;
