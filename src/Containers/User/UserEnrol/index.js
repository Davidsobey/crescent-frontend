import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

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

class EnrolmentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(UserActions.getAll());
    this.props.dispatch(CourseActions.clearCourses());
  }

  submit = (values) => {
    const enrolment = Object.assign({}, values);
    console.log(enrolment);
    this.props.dispatch(UserActions.enrol(enrolment));
  };

  loadCourses = (values) => {
    const user = this.props.users.find(x => x.id === values.target.value);
    this.props.dispatch(CourseActions
      .loadCoursesByClientSubscriptions(user.clientId));
  };

  render() {
    return (
      <Card width="600px" title="Enrol A User In A Course">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.users ? (
                <div>
                  <Field
                    name="user"
                    onChange={this.loadCourses}
                    label="User Name"
                    component={Select}
                  >
                    {this.props.users.map(user => (
                      <MenuItem value={user.id} key={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Users
                </div>
              )}
              {this.props.courses ? (
                <Field
                  name="course"
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
                  Loading Courses...
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
              Enrol User
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
  courseLoading: PropTypes.bool,
  users: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    courses: state.CourseReducer.courses,
    courseLoading: state.CourseReducer.loading,
    users: state.UserReducer.users,
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
