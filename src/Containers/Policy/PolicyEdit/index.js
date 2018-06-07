/**
 *
 * PolicyEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import PolicyActions from '../../../Actions/PolicyActions';

/* eslint-disable react/prefer-stateless-function */
class PolicyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = (values) => {
    this.props.dispatch(PolicyActions.editPolicy(values));
  };

  render() {
    return (
      <Card width="600px" title="Edit Policy">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <div>
              <Field
                name="name"
                label="Policy Name"
                margin="normal"
                component={TextField}
              />
            </div>
            <div>
              <Field
                name="description"
                label="Policy Description"
                margin="normal"
                component={TextField}
              />
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Edit Policy
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

PolicyEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
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
  }),
  mapDispatchToProps,
)(PolicyEdited);

export default FormState;
