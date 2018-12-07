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
import AcknowledgementModal from '../../../Components/Modal/index';

const header = ['Name', 'View Material'];

class UsersPolicyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.loadMaterial = this.loadMaterial.bind(this);
    this.manipulateData = this.manipulateData.bind(this);
    this.acknowldegePolicy = this.acknowldegePolicy.bind(this);
  }

  handleAcknowledgement() {
    console.log('Policy Acknowledgement');
    const policyAcknowledgement = {
      user: this.props.user.id,
      policy: this.props.policyId,
      route: '/policies/list',
    };
    console.log(policyAcknowledgement);
    this.setState((policyAcknowledgement));
    this.child.handleOpen();
  }

  acknowledgePolicy = obj => () => {
    this.props.dispatch(PolicyActions.acknowledge(obj));
    this.child.handleClose();
  }

  loadMaterial(material) {
    this.props.dispatch(PolicyActions.loadMaterial(material));
    // window.open(material);
  }

  manipulateData = (policyMaterials) => {
    const data = [];
    if (Array.isArray(policyMaterials)) {
      policyMaterials.forEach((policyMaterial, index) => {
        const newPolicyMaterial = {
          name: `Material ${(index + 1).toString()}`,
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
      <div>
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
                  Acknowledging Policy
                </div>
              ) : (
                <div className="formAlignRight">
                  <Button
                    className="buttonFormat"
                    variant="raised"
                    color="primary"
                    onClick={() => this.handleAcknowledgement()}
                  >
                    Acknowldege
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
        <AcknowledgementModal
          obj={this.state && this.state.obj}
          /* eslint-disable no-return-assign */
          onRef={ref => (this.child = ref)}
          onClick={this.acknowldegePolicy(this.state.obj)}
        />
      </div>
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
