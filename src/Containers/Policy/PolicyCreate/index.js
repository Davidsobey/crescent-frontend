import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import PolicyActions from '../../../Actions/PolicyActions';

const validate = () => {
  const errors = {};

  return errors;
};

/* eslint-disable react/prefer-stateless-function */
class PolicyCreate extends React.Component {
  submit = (values) => {
    this.props.dispatch(PolicyActions.create(values.policyName, values.policyDescription));
  };

  render() {
    return (
      <Card width="600px" title="Create New Policy">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <div>
              <Field
                name="policyName"
                label="Policy Name"
                margin="normal"
                component={TextField}
              />
            </div>
            <div>
              <Field
                name="policyDescription"
                label="Policy Description"
                margin="normal"
                component={TextField}
              />
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Create Policy
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

PolicyCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const withForm = reduxForm(
  {
    form: 'policyCreate',
    validate,
  },
  PolicyCreate,
);

export default compose(withForm)(PolicyCreate);
