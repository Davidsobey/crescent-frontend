/**
 *
 * ClientEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import ClientActions from '../../../Actions/ClientActions';

const required = value => (value ? undefined : 'Required');
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

class ClientEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = (values) => {
    this.props.dispatch(ClientActions.editClient(values));
  };

  render() {
    return (
      <Card width="600px" title="Edit Client">
        {this.props.client_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <form
            onSubmit={this.props.handleSubmit(this.submit)}
            autoComplete="off"
            className="centerForm"
          >
            <div>
              <div>
                <Field
                  name="name"
                  label="Client Name"
                  margin="normal"
                  component={TextField}
                  validate={[required]}
                />
              </div>
              <div>
                <Field
                  name="clientCode"
                  label="Client Code"
                  margin="normal"
                  component={TextField}
                  validate={[required]}
                />
              </div>
              <div>
                <Field
                  name="accountNumber"
                  label="Bank Account Number"
                  margin="normal"
                  component={TextField}
                  validate={[required]}
                />
              </div>
              <div>
                <Field
                  name="bank"
                  label="Bank Name"
                  margin="normal"
                  component={TextField}
                  validate={[required]}
                />
              </div>
              <div>
                <Field
                  name="branchName"
                  label="Branch Name"
                  margin="normal"
                  component={TextField}
                  validate={[required]}
                />
              </div>
              <div>
                <Field
                  name="branchCode"
                  label="Branch Code"
                  margin="normal"
                  component={TextField}
                  validate={[required]}
                />
              </div>
            </div>
            {this.props.client_editing ? (
              <div style={{ width: '400px' }}>
                <LinearProgress color="secondary" />
                Editing Client
              </div>
            ) : (
              <div className="formAlignRight">
                <Button
                  className="buttonFormat"
                  variant="raised"
                  color="primary"
                  type="submit"
                >
                  Edit Client
                </Button>
              </div>
            )}
          </form>
        )}
      </Card>
    );
  }
}

ClientEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  client_loading: PropTypes.bool,
  client_editing: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const ClientEdited = reduxForm({
  form: 'clientEdit', // a unique identifier for this form
})(ClientEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.ClientReducer.client, // pull initial values from reducer
    client_loading: state.ClientReducer.client_loading,
    client_editing: state.ClientReducer.client_editing,
  }),
  mapDispatchToProps,
)(ClientEdited);

export default FormState;
