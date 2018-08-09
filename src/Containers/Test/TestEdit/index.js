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
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import TextField from '../../../Components/TextField';
import TestActions from '../../../Actions/TestActions';
import Button from '../../../Components/Button';
import ModuleActions from '../../../Actions/ModuleActions';
import LinearProgress from '../../../Components/LinearProgress';

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

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
      <Card width="600px" title="Edit Assessment">
        {this.props.test_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <form
            onSubmit={this.props.handleSubmit(this.submit)}
            autoComplete="off"
            className="centerForm"
          >
            <div>
              {!this.props.modules_loading ? (
                <div>
                  <Field 
                    name="moduleID" 
                    label="Module Name" 
                    component={Select}
                    validate={[ required ]}
                  >
                    {this.props.modules.map(module => (
                      <MenuItem value={module.id} key={module.id}>
                        {module.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Modules
                </div>
              )}
              <div>
                <Field
                  name="name"
                  label="Assessment Name"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
              <div>
                <Field
                  name="totalMarks"
                  label="Total Marks"
                  margin="normal"
                  component={TextField}
                  validate={[ required, number ]}
                />
              </div>
            </div>
            {this.props.test_editing ? (
              <div style={{width: '400px'}}>
                <LinearProgress color="secondary" />
                Editing Module
              </div>
            ) : (
              <div className="formAlignRight">
                <Button
                  className="buttonFormat"
                  variant="raised"
                  color="primary"
                  type="submit"
                >
                  Edit Test
                </Button>
              </div>
            )}
          </form>
        )}
      </Card>
    );
  }
}

TestEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  modules: PropTypes.array,
  modules_loading: PropTypes.bool,
  test_loading: PropTypes.bool,
  test_editing: PropTypes.bool,
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
    modules_loading: state.ModuleReducer.loading,
    test_loading: state.TestReducer.test_loading,
    test_editing: state.TestReducer.test_editing,
  }),
  mapDispatchToProps,
)(TestEdited);

export default FormState;
