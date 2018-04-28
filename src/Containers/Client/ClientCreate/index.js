/**
 *
 * ClientCreate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import ClientActions from '../../../Actions/ClientActions';

const validate = () => {
  const errors = {};

  return errors;
};

/* eslint-disable react/prefer-stateless-function */
class ClientCreate extends React.Component {
  submit = (values) => {
    const client = Object.assign({}, values);
    this.props.dispatch(ClientActions.create(client));
  };

  render() {
    return (
      <Card width="600px" title="Create New Client">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <div>
              <Field
                name="name"
                label="Name"
                margin="normal"
                component={TextField}
              />
            </div>
            <div>
              <Field
                name="email"
                label="Email"
                margin="normal"
                component={TextField}
              />
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Create Client
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

ClientCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const withForm = reduxForm(
  {
    form: 'clientCreate',
    validate,
  },
  ClientCreate,
);

export default compose(withForm)(ClientCreate);
