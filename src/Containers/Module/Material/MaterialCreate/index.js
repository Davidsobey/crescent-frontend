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
    this.props.dispatch(ModuleActions.getAll());
  }

  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  submit = (values) => {
    const file = this.state.selectedFile;
    this.props.dispatch(ModuleActions.uploadMaterial(
      values.ModuleId,
      file,
    ));
  };

  render() {
    return ( 
      <Card width="600px" title="Create New Material">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <div className="width200">
              {this.props.modules ? (
                <Field name="ModuleId" label="Module Name" component={Select}>
                  {this.props.modules.map(module => (
                    <MenuItem value={module.id} key={module.id}>
                      {module.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                    Loading Modules
                </div>
              )}
              <div>
                <input type="file" onChange={this.fileSelectedHandler} />
              </div>
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Create Material
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

MaterialCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  modules: PropTypes.array,
};

const mapStateToProps = state => ({
  modules: state.ModuleReducer.modules,
});

const withForm = reduxForm(
  {
    form: 'materialCreate',
    validate,
  },
  MaterialCreate,
);

export default compose(connect(mapStateToProps), withForm)(MaterialCreate);
