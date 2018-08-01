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
import UserActions from '../../../Actions/UserActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

class EnrolmentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(UserActions.getAll());
    this.props.dispatch(CourseActions.clearCourses());
    this.state = {
      value: this.props.value,
      data: '',
    };
  }

  submit = (values) => {
    const enrolment = Object.assign({}, values);
    this.props.dispatch(UserActions.enrol(enrolment));
  };

  loadCourses = (values) => {
    const user = this.props.users.find(x => x.id === values.target.value);
    this.props.dispatch(CourseActions
      .loadCoursesByClientSubscriptions(user.clientId));
  };

  render() {
    const { selectedDate } = this.state;
    const val = this.state.value || null;

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
                    {this.props.users
                    .filter(user => (this.props.user.role.name=='Admin' ||this.props.user.clientId==user.clientId))
                    .map(user => (
                      <MenuItem value={user.id} key={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              )}
              {this.props.courses_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses...
                </div>
              ) : this.props.courses.length ? (
                <Field
                  name="course"
                  label="Course Name"
                  component={Select}
                  validate={[ required ]}
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
                  validate={[ required ]}
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
  users: PropTypes.array,
  users_loading: PropTypes.bool,
  user: PropTypes.object,
  user_enrolling: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    courses: state.CourseReducer.courses,
    courses_loading: state.CourseReducer.loading,
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
