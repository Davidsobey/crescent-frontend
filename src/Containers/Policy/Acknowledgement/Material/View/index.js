// get the requested file and display it

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
// import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { Document, Page } from 'react-pdf/dist/entry.noworker';
import Card from '../../../../../Components/Card';

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

class PolicyAcknowledgementMaterialView extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onMaterialLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { user } = this.props;
    const { pageNumber, numPages } = this.state;
    console.log(this.props.material);

    return (
      <div>
        <Card width="1200px" title="View Material">
          <Document
            file={this.props.material.filePath}
            noData="No PDF file specified"
            onLoadSuccess={this.onMaterialLoad}
            width="100%"
          >
            <Page pageNumber={pageNumber} />
            <p>Page {pageNumber} of {numPages}</p>
          </Document>
        </Card>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  material: state.PolicyReducer.material,
});

const withForm = reduxForm(
  {
    form: 'policyAcknowledgementMaterialView',
  },
  PolicyAcknowledgementMaterialView,
);

PolicyAcknowledgementMaterialView.propTypes = {
  user: PropTypes.object,
  material: PropTypes.object,
};

export default compose(connect(mapStateToProps), withForm)(PolicyAcknowledgementMaterialView);
