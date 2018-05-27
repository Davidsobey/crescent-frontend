/**
 *
 * TestEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';

import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import TextField from '../../../Components/TextField';
import TestActions from '../../../Actions/TestActions';
import Button from '../../../Components/Button';
import ModuleActions from '../../../Actions/ModuleActions';
import LinearProgress from '../../../Components/LinearProgress';

/* eslint-disable react/prefer-stateless-function */
class TestEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(ModuleActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(TestActions.editTest(values));
  };

  render() {
    return (
      <Card width="600px" title="Edit Test">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <div>
              {this.props.modules ? (
                <Field name="moduleID" label="Module Name" component={Select}>
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
              <Field
                name="name"
                label="Test Name"
                margin="normal"
                component={TextField}
              />
            </div>
            <div>
              <Field
                name="totalMarks"
                label="Total Marks"
                margin="normal"
                component={TextField}
              />
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Edit Test
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

TestEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  modules: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const TestEdited = reduxForm({
  form: 'testEdit', // a unique identifier for this form
})(TestEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.TestReducer.test,
    modules: state.ModuleReducer.modules,
  }),
  mapDispatchToProps,
)(TestEdited);

export default FormState;
