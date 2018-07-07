import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import { Typography } from 'material-ui/styles/typography';

import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import UserActions from '../../../Actions/UserActions';
import CourseActions from '../../../Actions/CourseActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};

/* eslint-disable react/prefer-stateless-function */
class EnrolmentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(UserActions.getAll());
    this.props.dispatch(CourseActions.clearCourses());
  }
  submit = (values) => {
    const enrolment = Object.assign({}, values);
    this.props.dispatch(UserActions.enrol(enrolment));
  };

  loadCourses = (values) => {
    this.props.dispatch(CourseActions.loadCoursesByClientSubscriptions(values.target.key));
  };

  render() {
    return (
      <Card width="600px" title="Enrol in Course">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.users ? (
                <Field
                  name="userID"
                  label="User Name"
                  component={Select}
                  onChange={this.loadCourses}
                >
                  {this.props.users.map(user => (
                    <MenuItem value={user.id} key={user.clientId}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Users
                </div>
              )}
              {this.props.courses ? (
                <Field
                  name="courseID"
                  label="Course Name"
                  component={Select}
                >
                  {this.props.courses.map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <Typography variant="caption" component="p">
                  Choose a user to load subscribed courses
                  </Typography>
                </div>
              )}
              {this.props.courseLoading && (
                <div>
                  <LinearProgress color="secondary" />
                    Loading courses...
                </div>
              )}
            </div>
          </div>
          <div className="formAlignRight">
            <Button
              className="buttonFormat"
              variant="raised"
              color="primary"
              type="submit"
            >
              Enrol
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

EnrolmentCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  users: PropTypes.array,
  courseLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  users: state.UserReducer.users,
  courseLoading: state.CourseReducer.loading,
});

const withForm = reduxForm(
  {
    form: 'enrolmentCreate',
    validate,
  },
  EnrolmentCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(EnrolmentCreate);
