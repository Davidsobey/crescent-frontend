/**
 *
 * CourseEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import TextField from '../../../Components/TextField';
import CourseActions from '../../../Actions/CourseActions';
import Button from '../../../Components/Button';
import ModuleActions from '../../../Actions/ModuleActions';

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

/* eslint-disable react/prefer-stateless-function */
class ModuleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(CourseActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(ModuleActions.editModule(values));
  };

  render() {
    return (
      <Card width="600px" title="Edit Module">
        {this.props.module_loading ? (
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
              {!this.props.courses_loading ? (
                <div>
                  <Field 
                    name="courseId" 
                    label="Course Name" 
                    component={Select}
                    validate={[ required ]}
                  >
                    {(Array.isArray(this.props.courses) ? this.props.courses : [])
                    .map(course => (
                      <MenuItem value={course.id} key={course.id}>
                        {course.name}
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
                  label="Module Name"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
              <div>
                <Field
                  name="description"
                  label="Key Outcome"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
            </div>
            {this.props.module_editing ? (
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
                  Edit Module
                </Button>
              </div>
            )}
          </form>
        )}
      </Card>
    );
  }
}

ModuleEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  module_loading: PropTypes.bool,
  module_editing: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const ModuleEdited = reduxForm({
  form: 'moduleEdit', // a unique identifier for this form
})(ModuleEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.ModuleReducer.module,
    courses: state.CourseReducer.courses,
    courses_loading: state.CourseReducer.loading,
    module_loading: state.ModuleReducer.module_loading,
    module_editing: state.ModuleReducer.module_editing,
  }),
  mapDispatchToProps,
)(ModuleEdited);

export default FormState;
