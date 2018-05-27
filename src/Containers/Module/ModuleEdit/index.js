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

import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import TextField from '../../../Components/TextField';
import CourseActions from '../../../Actions/CourseActions';
import Button from '../../../Components/Button';
import ModuleActions from '../../../Actions/ModuleActions';

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
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            {!this.props.loading ? (
              <div>
                <Field name="courseId" label="Course Name" component={Select}>
                  {this.props.courses.map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Field>
              </div>
            ) : (
              <div className="center">
                <CircularProgress color="secondary" />
              </div>
            )}
            <div>
              <Field
                name="name"
                label="Module Name"
                margin="normal"
                component={TextField}
              />
            </div>
            <div>
              <Field
                name="description"
                label="Module Description"
                margin="normal"
                component={TextField}
              />
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Edit Module
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

ModuleEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  courses: PropTypes.array,
  loading: PropTypes.bool,
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
    loading: state.ModuleReducer.loading,
  }),
  mapDispatchToProps,
)(ModuleEdited);

export default FormState;
