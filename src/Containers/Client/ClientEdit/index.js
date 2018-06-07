/**
 *
 * ClientEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import ClientActions from '../../../Actions/ClientActions';

/* eslint-disable react/prefer-stateless-function */
let ClientEdit = (props) => {
  const submit = (values) => {
    props.dispatch(ClientActions.editClient(values));
  };
  ClientEdit.propTypes = {
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
  };
  return (
    <Card width="600px" title="Edit Client">
      <form onSubmit={props.handleSubmit(submit)} noValidate autoComplete="off">
        <div>
          <div>
            <Field
              name="name"
              label="Client Name"
              margin="normal"
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="email"
              label="Client Email"
              margin="normal"
              component={TextField}
            />
          </div>
        </div>
        <div className="alignRight">
          <Button variant="raised" color="primary" type="submit">
            Edit Client
          </Button>
        </div>
      </form>
    </Card>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ClientEdit = reduxForm({
  form: 'clientEdit', // a unique identifier for this form
})(ClientEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.ClientReducer.client, // pull initial values from reducer
  }),
  mapDispatchToProps,
)(ClientEdit);

export default FormState;
