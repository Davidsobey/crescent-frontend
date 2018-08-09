/**
 *
 * CourseCreate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import CourseActions from '../../../Actions/CourseActions';

const validate = () => {
  const errors = {};

  return errors;
};
let courses = [];
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const course_exists = value => value && courses.filter(course => course.name==value).length ? 'Course already exists' : undefined;

/* eslint-disable react/prefer-stateless-function */
class CourseCreate extends React.Component {
  componentWillMount() {
    this.props.dispatch(CourseActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(CourseActions.create(values));
  };

  render() {
    courses = this.props.courses;

    return (
      <Card width="600px" title="Create New Course">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          autoComplete="off"
          className="centerForm"
        >
          <div>
            {!this.props.courses || this.props.courses_loading ? (
              <div>
                <LinearProgress color="secondary" />
                Loading Courses
              </div>
            ) : (
              <div>
                <Field
                  name="courseName"
                  label="Course Name"
                  margin="normal"
                  component={TextField}
                  validate={[ required, course_exists ]}
                />
              </div>
            )}
            <div>
              <Field
                name="courseDescription"
                label="Course Description"
                margin="normal"
                component={TextField}
                validate={[ required ]}
              />
            </div>
            <div>
              <Field
                name="cpdHours"
                label="Course CPD Hours"
                margin="normal"
                component={TextField}
                validate={[ required, number ]}
              />
            </div>
          </div>
          {this.props.course_creating ? (
            <div style={{width: '400px'}}>
              <LinearProgress color="secondary" />
              Creating Course
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Course
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  courses_loading: state.CourseReducer.loading,
  course_creating: state.CourseReducer.creating,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

CourseCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  course_creating: PropTypes.bool,
};

const withForm = reduxForm(
  {
    form: 'courseCreate',
    validate,
  },
  CourseCreate,
);

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(CourseCreate);
