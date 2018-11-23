// get the requested file and display it
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import history from '../../../../Helpers/History';
import Card from '../../../../Components/Card';
import Table from '../../../../Components/Table';
import ModuleActions from '../../../../Actions/ModuleActions';

const header = ['Material Name', 'View Material'];

class PolicyMaterialDetails extends React.Component {
  constructor(props) {
    super(props);
    this.loadMaterial = this.loadMaterial.bind(this);
    this.manipulateData = this.manipulateData.bind(this);
    // this.acknowldegePolicy = this.acknowldegePolicy.bind(this);
  }

  loadMaterial(material) {
    // const props = this.getProps(material);
    this.props.dispatch(ModuleActions.loadMaterial(material));
    history.push('/policy/material/view');
  }

  manipulateData = (materials) => {
    const data = [];
    if (Array.isArray(materials)) {
      materials.forEach((policyMaterial, index) => {
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
    // eslint-disable-next-line no-unused-vars
    const { user } = this.props;
    const policyMaterials = this.manipulateData(this.props.materials);
    return (
      <Card width="800px" title={`Policy - ${this.props.policyName}`}>
        <div>
          Description : {this.props.policyDescription}
        </div>
        {this.props.policyMaterials_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            <Table
              header={header}
              data={policyMaterials}
            />
          </div>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  materials: state.ModuleReducer.moduleMaterials,
  policyMaterials_loading: state.ModuleReducer.moduleMaterials_loading,
  policyName: state.ModuleReducer.material.name,
  policyDescription: state.ModuleReducer.material.description,
});

const withForm = reduxForm(
  {
    form: 'userView',
  },
  PolicyMaterialDetails,
);

PolicyMaterialDetails.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  materials: PropTypes.array,
  policyMaterials_loading: PropTypes.bool,
  policyName: PropTypes.string,
  policyDescription: PropTypes.string,
};

export default compose(connect(mapStateToProps), withForm)(PolicyMaterialDetails);
