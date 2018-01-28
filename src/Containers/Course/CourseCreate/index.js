/**
 *
 * CourseCreate
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";

import Card from "../../../Components/Card";
import TextField from "../../../Components/TextField";
import AppBar from "../../../Components/AppBar";
import Button from "../../../components/Button";
import CourseActions from "../../../Actions/CourseActions";

const validate = values => {
  const errors = {};

  //   if (!values.companyName) {
  //     errors.companyName = 'Required';
  //   }

  return errors;
};

/* eslint-disable react/prefer-stateless-function */
class CourseCreate extends React.Component {
  submit = values => {
    this.props.dispatch(
      CourseActions.create(values.courseName, values.courseDescription)
    );
  };

  render() {
    return (
      <AppBar>
        <Card width="600px" title="Create New Course">
          <form
            onSubmit={this.props.handleSubmit(this.submit)}
            noValidate
            autoComplete="off"
          >
            <div>
              <div>
                <Field
                  name="courseName"
                  label={"Course Name"}
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="courseDescription"
                  label="Course Description"
                  margin="normal"
                  component={TextField}
                />
              </div>
            </div>
            <div className="alignRight">
              <Button raised color="primary" type="submit">
                Create Course
              </Button>
            </div>
          </form>
        </Card>
      </AppBar>
    );
  }
}

const withForm = reduxForm(
  {
    form: "courseCreate",
    validate
  },
  CourseCreate
);

export default compose(
  // eslint-disable-line no-class-assign
  withForm
)(CourseCreate);