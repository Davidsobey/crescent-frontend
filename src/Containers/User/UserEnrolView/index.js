/**
 *
 * UserEnrolView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';

import history from '../../../Helpers/History';
import Card from '../../../Components/Card';
import UserActions from '../../../Actions/UserActions';
import CourseActions from '../../../Actions/CourseActions';
import ClientActions from '../../../Actions/ClientActions';
import IconButton from '../../../Styles/IconButton';
import { StyledDelete } from '../../../Styles/Delete';
import { StyledEdit } from '../../../Styles/Edit';

class UserEnrolView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
  }

  componentDidMount() {
    this.props.dispatch(UserActions.getAll());
    this.props.dispatch(CourseActions.getAll());
    this.props.dispatch(ClientActions.getUserEnrolments(this.props.user.clientId));
  }

  manipulateData = (userEnrolments) => {
    var getUserNameById = userId => {
      if (this.props.users) {
        let user = this.props.users.filter(user => user.id == userId);
        return user.length > 0 ? user[0].name : '';
      }
      return '';
    };
    var getCourseNameById = courseId => {
      if (this.props.courses) {
        let course = this.props.courses.filter(course => course.id == courseId);
        return course.length > 0 ? course[0].name : '';
      }
      return '';
    };

    const data = [];
    if (userEnrolments) {
      userEnrolments
      .forEach((enrolInfo) => {
        const row = {
          userName: getUserNameById(enrolInfo.userId),
          courseName: getCourseNameById(enrolInfo.courseId),
          deadline: enrolInfo.deadline.slice(0,10),
          status: enrolInfo.enrolmentTests,
        };
        data.push(row);
      });
    }
    return data;
  };

  render() {
    const data = this.manipulateData(this.props.userEnrolments);
    const columns = [
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'Course Name',
        accessor: 'courseName',
      },
      {
        Header: 'Deadline',
        accessor: 'deadline',
      },
      {
        Header: 'Completion Status',
        accessor: 'status',
      },
    ];
    return (
      <div>
        <Card width="800px" title="Enrolment List">
          <div>
            <ReactTable
              columns={columns}
              data={data}
              filterable
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  users: state.UserReducer.users,
  courses: state.CourseReducer.courses,
  userEnrolments: state.ClientReducer.userEnrolments,
});

const withForm = reduxForm(
  {
    form: 'userEnrolView',
  },
  UserEnrolView,
);

UserEnrolView.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  courses: PropTypes.array,
  userEnrolments: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(
  connect(mapStateToProps),
  withForm,
)(UserEnrolView);
