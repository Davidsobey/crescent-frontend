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
import GoogleDocsViewer from 'react-google-docs-viewer';

/* eslint-disable react/prefer-stateless-function */

class ModuleMaterialView extends React.Component {
  render() {
    const { user } = this.props;
    console.log(`Material to be viewed ${this.props.material}`);
    return (
      <GoogleDocsViewer
        width="600px"
        height="780px"      
        fileUrl={this.props.material.filePath}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  material: state.ModuleReducer.material,
});

const withForm = reduxForm(
  {
    form: 'moduleMaterialView',
  },
  ModuleMaterialView,
);

ModuleMaterialView.propTypes = {
  user: PropTypes.object,
  material: PropTypes.object,
};

export default compose(connect(mapStateToProps), withForm)(ModuleMaterialView);
