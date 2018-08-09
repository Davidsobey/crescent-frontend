/**
 *
 * UsersPolicyDetails
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
import Button from '../../../Components/Button';
import PolicyActions from '../../../Actions/PolicyActions';

const header = ['Name', 'View Material'];

class UsersPolicyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.loadMaterial = this.loadMaterial.bind(this);
    this.manipulateData = this.manipulateData.bind(this);
    this.acknowldegePolicy = this.acknowldegePolicy.bind(this);
  }
  
  acknowldegePolicy() {
    this.props.dispatch(PolicyActions.acknowledge(this.props.user.id, this.props.policyId, '/policies/list'));
  }

  loadMaterial(url) {
    window.open(url);
  }

  manipulateData = (policyMaterials) => {
    const data = [];
    if (Array.isArray(policyMaterials)) {
      policyMaterials.forEach((policyMaterial, index) => {
        const newPolicyMaterial = {
          name: 'Material '+(index+1).toString(),
          button: {
            message: 'View Material',
            onClick: () => this.loadMaterial(policyMaterial),
          },
        };
        data.push(newPolicyMaterial);
      });
    }
    return data;
  };

  render() {
    const { user, policyMaterials } = this.props;
    console.log('policy', policyMaterials);
    return (
      <Card width="800px" title="My Policy List">
        {this.props.policyMaterials_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            <Table
              header={header}
              data={this.manipulateData(policyMaterials)}
            />
            {this.props.policy_acknowledging ? (
              <div>
                <LinearProgress color="secondary" />
                Acknowldeging Policy
              </div>
            ) : (
              <div className="formAlignRight">
                <Button
                  className="buttonFormat"
                  variant="raised"
                  color="primary"
                  onClick={() => this.acknowldegePolicy()}
                >
                  Acknowldege
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  policyMaterials: state.PolicyReducer.policyMaterials,
  policyMaterials_loading: state.PolicyReducer.policyMaterials_loading,
  policyId: state.PolicyReducer.policyId,
  policy_acknowledging: state.PolicyReducer.acknowledging,
});

const withForm = reduxForm(
  {
    form: 'userView',
  },
  UsersPolicyDetails,
);

UsersPolicyDetails.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  policyMaterials: PropTypes.array,
  policyMaterials_loading: PropTypes.bool,
  policyId: PropTypes.object,
  policy_acknowledging: PropTypes.bool,
};

export default compose(connect(mapStateToProps), withForm)(UsersPolicyDetails);
