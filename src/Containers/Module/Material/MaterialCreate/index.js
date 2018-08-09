// do a file upload
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';

import Select from '../../../../Components/Select';
import Card from '../../../../Components/Card';
import Button from '../../../../Components/Button';
import ModuleActions from '../../../../Actions/ModuleActions';
import LinearProgress from '../../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};

class MaterialCreate extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount () {
    this.props.dispatch(ModuleActions.getAll());
    if (this.props.newModuleId)
      this.props.initialize({ ModuleId: this.props.newModuleId });
  }

  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  submit = (values) => {
    const file = this.state.selectedFile;
    this.props.dispatch(ModuleActions.uploadMaterial(values.ModuleId, file));
  };

  render() {
    return (
      <Card width="600px" title="Create New Material">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.modules_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Modules...
                </div>
              ) : (Array.isArray(this.props.modules) ? this.props.modules.length : false) ? (
                <Field name="ModuleId" label="Module Name" component={Select}>
                  {this.props.modules.map(module => (
                    <MenuItem value={module.id} key={module.id}>
                      {module.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <Typography variant="caption" component="p">
                    No available courses
                  </Typography>
                </div>
              )}
              <div>
                <input type="file" onChange={this.fileSelectedHandler} />
              </div>
            </div>
          </div>
          {this.props.uploading ? (
            <div style={{width: '400px'}}>
              <LinearProgress color="secondary" />
              Creating Material
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Material
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

MaterialCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  modules: PropTypes.array,
  modules_loading: PropTypes.bool,
  newModuleId: PropTypes.number,
  uploading: PropTypes.bool,
};

const mapStateToProps = state => ({
  modules: state.ModuleReducer.modules,
  modules_loading: state.ModuleReducer.loading,
  newModuleId: state.ModuleReducer.newModuleId,
  uploading: state.ModuleReducer.uploading,
});

const withForm = reduxForm(
  {
    form: 'materialCreate',
    validate,
  },
  MaterialCreate,
);

export default compose(connect(mapStateToProps), withForm)(MaterialCreate);
