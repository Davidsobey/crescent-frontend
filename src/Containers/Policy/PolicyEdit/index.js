/**
 *
 * PolicyEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import PolicyActions from '../../../Actions/PolicyActions';
import LinearProgress from '../../../Components/LinearProgress';

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

/* eslint-disable react/prefer-stateless-function */
class PolicyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = (values) => {
    console.log(values);
    this.props.dispatch(PolicyActions.editPolicy(values, values.id));
  };

  render() {
    return (
      <Card width="600px" title="Edit Policy">
        {this.props.policy_loading ? (
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
                  label="Policy Name"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
              <div>
                <Field
                  name="description"
                  label="Policy Description"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
            </div>
            {this.props.policy_editing ? (
              <div style={{width: '400px'}}>
                <LinearProgress color="secondary" />
                Editing Policy
              </div>
            ) : (
              <div className="formAlignRight">
                <Button
                  className="buttonFormat"
                  variant="raised"
                  color="primary"
                  type="submit"
                >
                  Edit Policy
                </Button>
              </div>
            )}
          </form>
        )}
      </Card>
    );
  }
}

PolicyEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  policy_loading: PropTypes.bool,
  policy_editing: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const PolicyEdited = reduxForm({
  form: 'policyEdit', // a unique identifier for this form
})(PolicyEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.PolicyReducer.policy,
    policy_loading: state.PolicyReducer.policy_loading,
    policy_editing: state.PolicyReducer.policy_editing,
  }),
  mapDispatchToProps,
)(PolicyEdited);

export default FormState;
