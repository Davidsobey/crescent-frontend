/**
 *
 * CourseEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import CourseActions from '../../../Actions/CourseActions';

/* eslint-disable react/prefer-stateless-function */
let CourseEdit = (props) => {
  const submit = (values) => {
    props.dispatch(CourseActions.editCourse(values));
  };
  CourseEdit.propTypes = {
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
  };
  return (
    <Card width="600px" title="Edit Course">
      <form onSubmit={props.handleSubmit(submit)} noValidate autoComplete="off">
        <div>
          <div>
            <Field
              name="name"
              label="Course Name"
              margin="normal"
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="description"
              label="Course Description"
              margin="normal"
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="cpdPoints"
              label="Course CPD Points"
              margin="normal"
              component={TextField}
            />
          </div>
        </div>
        <div className="alignRight">
          <Button variant="raised" color="primary" type="submit">
            Edit Course
          </Button>
        </div>
      </form>
    </Card>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
CourseEdit = reduxForm({
  form: 'courseEdit', // a unique identifier for this form
})(CourseEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.CourseReducer.course, // pull initial values from reducer
  }),
  mapDispatchToProps,
)(CourseEdit);

export default FormState;
