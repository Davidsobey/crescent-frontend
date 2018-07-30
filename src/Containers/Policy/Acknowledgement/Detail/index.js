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

import history from '../../../../Helpers/History';
import Card from '../../../../Components/Card';
import Table from '../../../../Components/Table';
import Button from '../../../../Components/Button';
import PolicyActions from '../../../../Actions/PolicyActions';

const header = ['Name', 'View Material'];

class UsersPolicyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.loadMaterial = this.loadMaterial.bind(this);
    this.manipulateData = this.manipulateData.bind(this);
    this.acknowldegePolicy = this.acknowldegePolicy.bind(this);
  }
  
  acknowldegePolicy() {
    this.props.dispatch(PolicyActions.acknowledge(this.props.user.id, this.props.policyId, '/policy/acknowledgement/list'));
  }

  loadMaterial(url) {
    window.open(url);
  }

  manipulateData = (policyMaterials) => {
    const data = [];
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
    console.log(data);
    return data;
  };

  render() {
    const { user, policyMaterials } = this.props;
    console.log('policy', policyMaterials);
    return (
      <Card width="800px" title="My Policy List">
        {Array.isArray(policyMaterials) ? (
          <div>
            <Table
              header={header}
              data={this.manipulateData(policyMaterials)}
            />
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
          </div>
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
  policyMaterials: state.PolicyReducer.policyMaterials,
  policyId: state.PolicyReducer.policyId,
});

const withForm = reduxForm(
  {
    form: 'userView',
  },
  UsersPolicyDetails,
);

UsersPolicyDetails.propTypes = {
  user: PropTypes.object,
  policyMaterials: PropTypes.array,
  policyId: PropTypes.object,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(UsersPolicyDetails);
