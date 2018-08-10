/**
 *
 * UserView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import history from '../../../Helpers/History';
import Card from '../../../Components/Card';
import Table from '../../../Components/Table';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';

const header = ['ID', 'Name', 'Description', 'View Course Details'];

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.loadCourse = this.loadCourse.bind(this);
    this.manipulateData = this.manipulateData.bind(this);
  }

  loadCourse(id) {
    this.props.dispatch(CourseActions.loadCourse(id));
    this.props.dispatch(ModuleActions.loadModuleByCourse(id));
    history.push('/courses/coursedetail');
  }

  manipulateData = (courses) => {
    const data = [];
    if (Array.isArray(courses)) {
      courses.forEach((course) => {
        const newCourse = {
          id: course.id,
          name: course.name,
          description: course.description,
          button: {
            message: 'View Course Details',
            onClick: () => this.loadCourse(course.id),
          },
        };
        data.push(newCourse);
      });
    }
    return data;
  };

  render() {
    const { user } = this.props;
    return (
      <Card width="800px" title="My Module List">
        {user ? (
          <Table
            header={header}
            data={this.manipulateData(user.enrolledCourses)}
          />
        ) : (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
});

const withForm = reduxForm(
  {
    form: 'userView',
  },
  UserView,
);

UserView.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(UserView);
