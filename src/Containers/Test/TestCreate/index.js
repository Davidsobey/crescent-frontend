import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import TestActions from '../../../Actions/TestActions';
import ModuleActions from '../../../Actions/ModuleActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};

class TestCreate extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(ModuleActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(TestActions.create(
      values.module,
      values.testName,
      values.testMarks,
    ));
  };

  render() {
    return (
      <Card width="600px" title="Create New Test">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <div className="width200">
              {this.props.modules ? (
                <Field name="module" label="Module Name" component={Select}>
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
                <Field
                  name="testName"
                  label="Test Name"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="testMarks"
                  label="Total Marks"
                  margin="normal"
                  component={TextField}
                />
              </div>
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Create Course
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

TestCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  modules: PropTypes.array,
};

const mapStateToProps = state => ({
  modules: state.ModuleReducer.modules,
});

const withForm = reduxForm(
  {
    form: 'courseCreate',
    validate,
  },
  TestCreate,
);

export default compose(connect(mapStateToProps), withForm)(TestCreate);
