
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import 'react-table/react-table.css';
import Card from '../../../Components/Card';

/* eslint-disable react/prefer-stateless-function */
class LoadingPage extends React.Component {
  render() {
    return (
      <div>
        <Card width="800px" title="Updating... ">
          <p> Pulling through your changes! </p>
        </Card>
      </div>
    );
  }
}

const withForm = reduxForm(
  {
    form: 'loadingPage',
  },
  LoadingPage,
);

LoadingPage.propTypes = {
};

export default compose(connect(), withForm)(LoadingPage);
