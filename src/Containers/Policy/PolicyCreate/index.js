import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '../../../Components/TextField';
import Card from '../../../Components/Card';
import Button from '../../../Components/Button';
import PolicyActions from '../../../Actions/PolicyActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};
const required = value => (value ? undefined : 'Required');
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

class PolicyCreate extends React.Component {
  submit = (values) => {
    this.props.dispatch(PolicyActions.create(values));
  };

  render() {
    return (
      <Card width="600px" title="Create New Policy">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              <div>
                <Field
                  name="name"
                  label="Policy Name"
                  margin="normal"
                  component={TextField}
                  validate={[required]}
                />
              </div>
              <div>
                <Field
                  name="description"
                  label="Policy Description"
                  margin="normal"
                  component={TextField}
                  validate={[required]}
                />
              </div>
            </div>
          </div>
          {this.props.policy_creating ? (
            <div style={{ width: '400px' }}>
              <LinearProgress color="secondary" />
              Creating Policy
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Policy
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

PolicyCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  policy_creating: PropTypes.bool,
};

const mapStateToProps = state => ({
  policy_creating: state.PolicyReducer.creating,
});

const withForm = reduxForm(
  {
    form: 'policyCreate',
    validate,
  },
  PolicyCreate,
);

export default compose(connect(mapStateToProps), withForm)(PolicyCreate);
