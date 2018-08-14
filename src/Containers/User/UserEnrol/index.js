import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import TextField from '../../../Components/TextField';
import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import CourseActions from '../../../Actions/CourseActions';
import ClientActions from '../../../Actions/ClientActions';
import UserActions from '../../../Actions/UserActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const futureDay = value => value && (new Date(value)) < (new Date()) ? 'Must be a future day' : undefined;

class EnrolmentCreate extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.newCourseId) {
      const newCourseId = this.props.newCourseId;
      this.props.initialize({ course: newCourseId });
    }
    this.props.dispatch(UserActions.getAll());
    //this.props.dispatch(CourseActions.clearCourses());
    this.state = {
      value: this.props.value,
      data: '',
      userId: undefined,
    };
  }

  submit = (values) => {
    const enrolment = Object.assign({}, values);
    this.props.dispatch(UserActions.enrol(enrolment));
  };

  loadCourses = (values) => {
    this.setState({userId: values.target.value});
    const user = this.props.users.find(x => x.id === values.target.value);
    this.props.dispatch(CourseActions.loadCoursesByClientSubscriptions(user.clientId));
    this.props.dispatch(ClientActions.getUserEnrolments(user.clientId));
  };

  render() {
    const { selectedDate } = this.state;
    const val = this.state.value || null;

    const isUnenrolledCourse = (course => {
      if (Array.isArray(this.props.userEnrolments)) {
        let length = this.props.userEnrolments
          .filter(userEnrolment => this.state.userId == userEnrolment.userId)
          .filter(userEnrolment => course.id == userEnrolment.courseId)
          .length;
        return length == 0;
      }
      return false;
    });

    const courses = (Array.isArray(this.props.courses) ? this.props.courses : []).filter(isUnenrolledCourse);

    return (
      <Card width="600px" title="Enrol A User In A Course">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.users_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Users
                </div>
              ) : (
                <div>
                  <Field
                    name="user"
                    onChange={this.loadCourses}
                    label="User Name"
                    component={Select}
                    validate={[ required ]}
                  >
                    {(Array.isArray(this.props.users) ? this.props.users : [])
                    .filter(user => (this.props.user.role.name=='Admin' ||this.props.user.clientId==user.clientId))
                    .map(user => (
                      <MenuItem value={user.id} key={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              )}
              {this.props.courses_loading || this.props.userEnrolments_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses...
                </div>
              ) : this.props.courses ? (
                <Field
                  name="course"
                  label="Course Name"
                  component={Select}
                  validate={[ required ]}
                >
                  {courses.length ?
                  courses.map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  )) : (
                    <MenuItem disabled={true}>
                      No Course
                    </MenuItem>
                  )}
                </Field>
              ) : (
                <div>
                  <Typography variant="caption" component="p">
                    Choose a user to load subscribed courses
                  </Typography>
                </div>
              )}
              <div>
                <Field
                  name="deadline"
                  label="Deadline"
                  margin="normal"
                  type="date"
                  component={TextField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  validate={[ required, futureDay ]}
                />
              </div>
            </div>
          </div>
          {this.props.user_enrolling ? (
            <div style={{width: '400px'}}>
              <LinearProgress color="secondary" />
              Enrolling User
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Enrol User
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

EnrolmentCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  newCourseId: PropTypes.number,
  userEnrolments: PropTypes.array,
  userEnrolments_loading: PropTypes.bool,
  users: PropTypes.array,
  users_loading: PropTypes.bool,
  user: PropTypes.object,
  user_enrolling: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    courses: state.CourseReducer.courses,
    courses_loading: state.CourseReducer.loading,
    newCourseId: state.CourseReducer.newCourseId,
    userEnrolments: state.ClientReducer.userEnrolments,
    userEnrolments_loading: state.ClientReducer.loading,
    users: state.UserReducer.users,
    users_loading: state.UserReducer.loading,
    user: state.LoginReducer.user,
    user_enrolling: state.UserReducer.enrolling,
  };
}

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
