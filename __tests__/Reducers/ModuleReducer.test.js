// Reducer to be tested
import ModuleReducer from '../../src/Reducers/ModuleReducer';
import ModuleConstants from '../../src/Constants/ModuleConstants';

describe('ModuleReducer', () => {
  test('CREATE_SUCCESS', () => {
    const action = { 
      type: ModuleConstants.CREATE_SUCCESS, 
      newModuleId: 1,
    };

    expect(ModuleReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETALL_SUCCESS', () => {
    const action = { 
      type: ModuleConstants.GETALL_SUCCESS, 
      modules: [],
    };

    expect(ModuleReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('UPLOAD_SUCCESS', () => {
    const action = { 
      type: ModuleConstants.UPLOAD_SUCCESS, 
    };

    expect(ModuleReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('LOADMODULE_SUCCESS', () => {
    const action = { 
      type: ModuleConstants.LOADMODULE_SUCCESS, 
      modules: [],
    };

    expect(ModuleReducer(undefined, action)).toMatchSnapshot();
  });
    
  test('MODULE_MATERIAL_SUCCESS', () => {
    const action = { 
      type: ModuleConstants.MODULE_MATERIAL_SUCCESS, 
      moduleMaterials: [],
    };

    expect(ModuleReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('LOADTESTS_SUCCESS', () => {
    const action = { 
      type: ModuleConstants.LOADTESTS_SUCCESS, 
      moduleTests: [],
    };

    expect(ModuleReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('LOAD_MODULE_SUCCESS', () => {
    const action = { 
      type: ModuleConstants.LOAD_MODULE_SUCCESS, 
      module: {id:1, name:'111'},
    };

    expect(ModuleReducer(undefined, action)).toMatchSnapshot();
  });
  
  test('EDIT_MODULE_SUCCESS', () => {
    const action = { 
      type: ModuleConstants.EDIT_MODULE_SUCCESS, 
    };

    expect(ModuleReducer(undefined, action)).toMatchSnapshot();
  });
});
