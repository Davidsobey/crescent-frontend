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
import { CircularProgress } from 'material-ui/Progress';

import history from '../../../Helpers/History';
import Card from '../../../Components/Card';
import Table from '../../../Components/Table';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';
import PolicyActions from '../../../Actions/PolicyActions';

const courseHeader = ['ID', 'Name', 'Description', 'View Course Details'];
const policyHeader = ['Name', 'Description', 'View Policy Details'];

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.loadCourse = this.loadCourse.bind(this);
    this.manipulateCourseData = this.manipulateCourseData.bind(this);
    this.loadPolicy = this.loadPolicy.bind(this);
    this.manipulatePolicyData = this.manipulatePolicyData.bind(this);
  }
  
  componentWillMount() {
    this.props.dispatch(PolicyActions.getOutstandingPoliciesForUser(this.props.user.id));
  }

  loadCourse(id) {
    this.props.dispatch(CourseActions.loadCourse(id));
    this.props.dispatch(ModuleActions.loadModuleByCourse(id));
    history.push('/courses/coursedetail');
  }

  loadPolicy(id) {
    this.props.dispatch(PolicyActions.getMaterialsForPolicy(id));
    history.push({pathname: '/policies/policydetail', state: {policyId: id}});
  }

  manipulateCourseData = (courses) => {
    const data = [];
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
    return data;
  };

  manipulatePolicyData = (policyAcknowledgements) => {
    const data = [];
    policyAcknowledgements.forEach((policyAcknowledgement) => {
      const newPolicyAcknowledgement = {
        name: policyAcknowledgement.policyName,
        description: policyAcknowledgement.policyDescription,
        button: {
          message: 'View Policy Details',
          onClick: () => this.loadPolicy(policyAcknowledgement.policyID),
        },
      };
      data.push(newPolicyAcknowledgement);
    });
    console.log(data);
    return data;
  };

  render() {
    const { user, policyAcknowledgements } = this.props;
    return (
      <Card width="800px" title="Overview">
        <p style={{fontSize:'20px', marginBottom: '15px'}}>My courses</p>
        {user && Array.isArray(user.enrolledCourses) ? (
          <Table
            header={courseHeader}
            data={this.manipulateCourseData(user.enrolledCourses)}
          />
        ) : (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        )}

        <p style={{fontSize:'20px', marginTop:'30px', marginBottom: '15px'}}>My policies</p>
        {!this.props.policyAcknowledgements_loading && Array.isArray(policyAcknowledgements) ? (
          <Table
            header={policyHeader}
            data={this.manipulatePolicyData(policyAcknowledgements)}
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
  policyAcknowledgements: state.PolicyReducer.policyAcknowledgements,
  policyAcknowledgements_loading: state.PolicyReducer.loading,
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
  policyAcknowledgements: PropTypes.array,
  policyAcknowledgements_loading: PropTypes.bool,
};

export default compose(connect(mapStateToProps), withForm)(HomeComponent);
