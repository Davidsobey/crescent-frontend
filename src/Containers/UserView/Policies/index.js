/**
 *
 * UsersPolicyView
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
import PolicyActions from '../../../Actions/PolicyActions';

const header = ['Name', 'Description', 'View Policy Details'];

class UsersPolicyView extends React.Component {
  constructor(props) {
    super(props);
    this.loadPolicy = this.loadPolicy.bind(this);
    this.manipulateData = this.manipulateData.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(PolicyActions.getOutstandingPoliciesForUser(this.props.user.id));
  }

  loadPolicy(id) {
    this.props.dispatch(PolicyActions.getMaterialsForPolicy(id));
    history.push({ pathname: '/policies/policydetail', state: { policyId: id } });
  }

  manipulateData = (policyAcknowledgements) => {
    const data = [];
    if (Array.isArray(policyAcknowledgements)) {
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
    }
    console.log(data);
    return data;
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { user, policyAcknowledgements } = this.props;
    return (
      <Card width="800px" title="My Policy List">
        {this.props.policyAcknowledgements_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Table
            header={header}
            data={this.manipulateData(policyAcknowledgements)}
          />
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
    form: 'userView',
  },
  UsersPolicyView,
);

UsersPolicyView.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  policyAcknowledgements: PropTypes.array,
  policyAcknowledgements_loading: PropTypes.bool,
};

export default compose(connect(mapStateToProps), withForm)(UsersPolicyView);
