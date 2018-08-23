import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import Card from '../../../../Components/Card';
import Select from '../../../../Components/Select';
import Button from '../../../../Components/Button';
import UserActions from '../../../../Actions/UserActions';
import PolicyActions from '../../../../Actions/PolicyActions';
import LinearProgress from '../../../../Components/LinearProgress';

const validate = () => {
  const errors = {};
  return errors;
};
const required = value => (value ? undefined : 'Required');
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

/* eslint-disable react/prefer-stateless-function */
class AcknowledgementCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(PolicyActions.getAll());
    this.props.dispatch(UserActions.getAll());
  }

  componentWillMount() {
    this.props.initialize({ policyID: this.props.newPolicyId });
  }

  submit = (values) => {
    const acknowledgement = Object.assign({}, values);
    this.props.dispatch(PolicyActions.createAcknowledgement(acknowledgement));
  };

  render() {
    const isValidPolicy = (policy => (Array.isArray(policy.materialIDs) ? policy.materialIDs.length : false));
    const isValidUser = (user => (!((user.clientId != userInfo.clientId || user.role.name == 'Admin') && userInfo.role.name == 'Client')));

    let { userInfo } = this.props;
    return (
      <Card width="600px" title="Assign A User A Policy To Acknowledge">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.users_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Users
                </div>
              ) : (
                <Field
                  name="userID"
                  label="User Name"
                  component={Select}
                  validate={[required]}
                >
                  {(Array.isArray(this.props.users) ? this.props.users : [])
                  .filter(isValidUser)
                  .map(user => (
                    <MenuItem value={user.id} key={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </div>
            <div>
              {this.props.policies_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Policies
                </div>
              ) : (
                <Field name="policyID" label="Policy Name" component={Select} validate={[required]}>
                  {(Array.isArray(this.props.policies) ? this.props.policies : [])
                  .filter(isValidPolicy)
                  .map(policy => (
                    <MenuItem value={policy.id} key={policy.id}>
                      {policy.name}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </div>
          </div>
          {this.props.acknowledgement_creating ? (
            <div style={{ width: '400px' }}>
              <LinearProgress color="secondary" />
              Assigning Policy
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Assign Policy
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

AcknowledgementCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  policies: PropTypes.array,
  policies_loading: PropTypes.bool,
  users: PropTypes.array,
  users_loading: PropTypes.bool,
  userInfo: PropTypes.object,
  newPolicyId: PropTypes.number,
  acknowledgement_creating: PropTypes.bool,
};

const mapStateToProps = state => ({
  policies: state.PolicyReducer.policies,
  policies_loading: state.PolicyReducer.loading,
  users: state.UserReducer.users,
  users_loading: state.UserReducer.loading,
  userInfo: state.LoginReducer.user,
  newPolicyId: state.PolicyReducer.newPolicyId,
  acknowledgement_creating: state.PolicyReducer.creating,
});

const withForm = reduxForm(
  {
    form: 'acknowledgementCreate',
    validate,
  },
  AcknowledgementCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(AcknowledgementCreate);
