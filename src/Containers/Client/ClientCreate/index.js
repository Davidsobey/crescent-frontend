/**
 *
 * ClientCreate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import ClientActions from '../../../Actions/ClientActions';

const validate = () => {
  const errors = {};

  return errors;
};
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

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
          className="centerForm"
        >
          <div>
            <div>
              <Field
                name="name"
                label="Name"
                margin="normal"
                component={TextField}
                validate={[ required ]}
              />
            </div>
            <div>
              <Field
                name="clientCode"
                label="Client Code"
                margin="normal"
                component={TextField}
                validate={[ required ]}
              />
            </div>
          </div>
          {this.props.client_creating ? (
            <div style={{width: '400px'}}>
              <LinearProgress color="secondary" />
              Creating Client
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Client
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  client_creating: state.ClientReducer.creating,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

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

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(ClientCreate);
