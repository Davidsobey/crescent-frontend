/**
 *
 * HomeComponent
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
import { CircularProgress } from 'material-ui/Progress';

import history from '../../Helpers/History';
import Button from '../../Components/Button';
import Card from '../../Components/Card';
import UserActions from '../../Actions/UserActions';
import CourseActions from '../../Actions/CourseActions';
import ClientActions from '../../Actions/ClientActions';
import PolicyActions from '../../Actions/PolicyActions';
import IconButton from '../../Styles/IconButton';
import { StyledDelete } from '../../Styles/Delete';
import { StyledEdit } from '../../Styles/Edit';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
  }

  componentDidMount() {
    this.props.dispatch(UserActions.getAll());
    this.props.dispatch(CourseActions.getAll());
    this.props.dispatch(ClientActions.getUserEnrolments(this.props.user.clientId));
    this.props.dispatch(PolicyActions.getOutstandingPoliciesForClient(this.props.user.clientId));
    this.props.dispatch(ClientActions.getSubscriptions());
  }

  loadPolicy = (id, name, description) => {
    this.props.dispatch(PolicyActions.getMaterialsForPolicy(id, name, description));
  };

  manipulateEnrolData = (userEnrolments) => {
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
      .filter( enrolInfo => getCourseNameById(enrolInfo.courseId))
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

  manipulateAcknowledgementData = (policyAcknowledgements) => {
    var getUserNameById = userId => {
      if (this.props.users) {
        let user = this.props.users.filter(user => user.id == userId);
        return user.length > 0 ? user[0].name : '';
      }
      return '';
    };
    const data = [];
    policyAcknowledgements
    .filter(policyAcknowledgement => policyAcknowledgement.policyMaterialLink)
    .forEach((policyAcknowledgement) => {
      const newPolicyAcknowledgement = {
        policyId: policyAcknowledgement.policyID,
        userId: policyAcknowledgement.userID,
        userName: getUserNameById(policyAcknowledgement.userID),
        policyName: policyAcknowledgement.policyName,
        description: policyAcknowledgement.policyDescription,
        acknowledged: policyAcknowledgement.acknowledged?'Yes':'No',
      };
      data.push(newPolicyAcknowledgement);
    });
    console.log(data);
    return data;
  };

  manipulateSubscriptionData = (subscriptions) => {
    var getClientNameById = clientId => {
      if (this.props.clients) {
        let client = this.props.clients.filter(client => client.id == clientId);
        return client.length > 0 ? client[0].name : '';
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
    subscriptions
    .forEach((subscription) => {
      const newSubscription = {
        clientName: getClientNameById(subscription.clientId),
        courseName: getCourseNameById(subscription.courseId),
        money: subscription.payableAmount,
        status: subscription.paymentStatusId,
      };
      data.push(newSubscription);
    });
    console.log(data);
    return data;
  };

  render() {
    const { user } = this.props;
    const enrolmentColumns = [
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
    const acknowledgementColumns = [
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'Policy Name',
        accessor: 'policyName',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Acknowledged',
        accessor: 'acknowledged',
      },
      { 
        Header: 'View Policy Details',
        accessor: 'view/acknowledge',
        Filter: <div />,
        Cell: row => (row.original.userId == user.id&&row.original.acknowledged=='No' ?
          <div>
            <Button
              className="small-font"
              color="primary"
              onClick={() => this.loadPolicy(row.original.policyId, row.original.policyName, row.original.description)}
            >
              View Policy Details
            </Button>
          </div> : <div></div>
        ),
      },
    ];
    const subscriptionColumns = [
      {
        Header: 'Client Name',
        accessor: 'clientName',
      },
      {
        Header: 'Course Name',
        accessor: 'courseName',
      },
      {
        Header: 'Money Amout',
        accessor: 'money',
      },
      {
        Header: 'Payment Status',
        accessor: 'status',
      },
    ];
    return (
      <div>
        <Card width="800px" title="Overview">
          <p style={{fontSize:'20px', marginBottom: '15px'}}>Enrolment List</p>
          {!this.props.users || this.props.users_loading || !this.props.courses || this.props.courses_loading || !this.props.userEnrolments || this.props.userEnrolments_loading ? (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              <ReactTable
                columns={enrolmentColumns}
                data={this.manipulateEnrolData(this.props.userEnrolments)}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
          )}
          <p style={{fontSize:'20px', marginTop:'30px', marginBottom: '15px'}}>Policy Acknowledgement List</p>
          {!this.props.policyAcknowledgements || this.props.policyAcknowledgements_loading || !this.props.users || this.props.users_loading ? (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              <ReactTable
                columns={acknowledgementColumns}
                data={this.manipulateAcknowledgementData(this.props.policyAcknowledgements)}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
          )}
          {user.role.name=='Admin' ? 
            <div>
              <p style={{fontSize:'20px', marginTop:'30px', marginBottom: '15px'}}>Client Subscriptions</p>
              {!this.props.subscriptions || this.props.subscriptions_loading ? (
                <div className="center">
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                <div>
                  <ReactTable
                    columns={subscriptionColumns}
                    data={this.manipulateSubscriptionData(this.props.subscriptions)}
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </div>
              )}
            </div>
          : '' }
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  users: state.UserReducer.users,
  users_loading: state.UserReducer.loading,
  courses: state.CourseReducer.courses,
  courses_loading: state.CourseReducer.loading,
  userEnrolments: state.ClientReducer.userEnrolments,
  userEnrolments_loading: state.ClientReducer.loading,
  policyAcknowledgements: state.PolicyReducer.policyAcknowledgements,
  policyAcknowledgements_loading: state.PolicyReducer.loading,
  subscriptions: state.ClientReducer.subscriptions,
  subscriptions_loading: state.ClientReducer.subscriptions_loading,
});

const withForm = reduxForm(
  {
    form: 'homeComponent',
  },
  HomeComponent,
);

HomeComponent.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  users: PropTypes.array,
  users_loading: PropTypes.bool,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  userEnrolments: PropTypes.array,
  userEnrolments_loading: PropTypes.bool,
  policyAcknowledgements: PropTypes.array,
  policyAcknowledgements_loading: PropTypes.bool,
  subscriptions: PropTypes.array,
  subscriptions_loading: PropTypes.bool,
};

export default compose(
  connect(mapStateToProps),
  withForm,
)(HomeComponent);
