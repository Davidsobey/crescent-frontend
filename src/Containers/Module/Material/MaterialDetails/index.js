// get the requested file and display it
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
import ModuleActions from '../../../../Actions/ModuleActions';
import LinearProgress from '../../../../Components/LinearProgress';

const header = ['Material Name', 'View Material'];

class ModuleMaterialDetails extends React.Component {
  constructor(props) {
    super(props);
    this.loadMaterial = this.loadMaterial.bind(this);
    this.manipulateData = this.manipulateData.bind(this);
    // this.acknowldegePolicy = this.acknowldegePolicy.bind(this);
  }

  // acknowldegePolicy() {
  //  this.props.dispatch(PolicyActions.acknowledge(this.props.user.id, this.props.policyId, '/policy/acknowledgement/list'));
  // }

  loadMaterial(url) {
    window.open(url);
    // need to open google document viewer here instead of just opening a window to the azure url
  }

  manipulateData = (moduleMaterials) => {
    const data = [];
    if (Array.isArray(moduleMaterials)) {
      moduleMaterials.forEach((moduleMaterial, index) => {
        const newModuleMaterial = {
          name: `Material ${(index + 1).toString()}`,
          button: {
            message: 'View Material',
            onClick: () => this.loadMaterial(moduleMaterial),
          },
        };
        data.push(newModuleMaterial);
      });
    }
    return data;
  };

  render() {
    const { user } = this.props;
    const moduleMaterials = this.manipulateData(this.props.moduleMaterials);

    return (
      <Card width="800px" title={`Module - ${  this.props.moduleName}`}>
        <div>
          Description : {this.props.moduleDescription}
        </div>
        {this.props.moduleMaterials_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            <Table
              header={header}
              data={moduleMaterials}
            />
          </div>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  moduleMaterials: state.ModuleReducer.moduleMaterials,
  moduleMaterials_loading: state.ModuleReducer.moduleMaterials_loading,
  moduleId: state.ModuleReducer.moduleId,
  moduleName: state.ModuleReducer.moduleName,
  moduleDescription: state.ModuleReducer.moduleDescription,
});

const withForm = reduxForm(
  {
    form: 'userView',
  },
  ModuleMaterialDetails,
);

ModuleMaterialDetails.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  moduleMaterials: PropTypes.array,
  moduleMaterials_loading: PropTypes.bool,
  moduleId: PropTypes.object,
  moduleName: PropTypes.string,
  moduleDescription: PropTypes.string,
};

export default compose(connect(mapStateToProps), withForm)(ModuleMaterialDetails);
