// get the requested file and display it
/**
 *
 * ModuleMaterialDetailsDetails
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
import ModuleActions from '../../../../Actions/ModuleActions';

const header = ['Material Name', 'View Material'];

class ModuleMaterialDetails extends React.Component {
  constructor(props) {
    super(props);
    this.loadMaterial = this.loadMaterial.bind(this);
    this.manipulateData = this.manipulateData.bind(this);
    // this.acknowldegePolicy = this.acknowldegePolicy.bind(this);
  }

  loadMaterial(material) {
    // const props = this.getProps(material);
    this.props.dispatch(ModuleActions.loadMaterial(material));
    history.push('/module/material/view');
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
      <Card width="800px" title={`Module - ${this.props.moduleName}`}>
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
  moduleName: PropTypes.string,
  moduleDescription: PropTypes.string,
};

export default compose(connect(mapStateToProps), withForm)(ModuleMaterialDetails);
