import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';

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
    this.props.dispatch(CourseActions.getAll());
    this.props.dispatch(UserActions.getAll());
  }
  submit = (values) => {
    const enrolment = Object.assign({}, values);
    this.props.dispatch(UserActions.enrol(enrolment));
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
              {this.props.courses ? (
                <Field name="courseID" label="Course Name" component={Select}>
                  {this.props.courses.map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses
                </div>
              )}
              {this.props.users ? (
                <Field name="userID" label="User Name" component={Select}>
                  {this.props.users.map(user => (
                    <MenuItem value={user.id} key={user.id}>
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
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  users: state.UserReducer.users,
});

const withForm = reduxForm(
  {
    form: 'enrolmentCreate',
    validate,
  },
  EnrolmentCreate,
);

export default compose(connect(mapStateToProps), withForm)(EnrolmentCreate);
