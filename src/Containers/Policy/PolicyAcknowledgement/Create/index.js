import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';

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

/* eslint-disable react/prefer-stateless-function */
class AcknowledgementCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(PolicyActions.getAll());
    this.props.dispatch(UserActions.getAll());
  }
  submit = (values) => {
    const acknowledgement = Object.assign({}, values);
    this.props.dispatch(PolicyActions.createAcknowledgement(acknowledgement));
  };

  render() {
    return (
      <Card width="600px" title="Assign A User A Policy To Acknowledge">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <div className="width200">
              {this.props.users ? (
                <Field name="user" label="User Name" component={Select}>
                  {this.props.users.map(user => (
                    <MenuItem value={user.id} key={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                    Loading Users
                </div>
                )}
              {this.props.policies ? (
                <Field name="policy" label="Policy Name" component={Select}>
                  {this.props.policies.map(policy => (
                    <MenuItem value={policy.id} key={policy.id}>
                      {policy.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                    Loading Policies
                </div>
                )}
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Create Acknowledgement
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

AcknowledgementCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  policies: PropTypes.array,
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  policies: state.PolicyReducer.policies,
  users: state.UserReducer.users,
});

const withForm = reduxForm(
  {
    form: 'acknowledgementCreate',
    validate,
  },
  AcknowledgementCreate,
);

export default compose(connect(mapStateToProps), withForm)(AcknowledgementCreate);
