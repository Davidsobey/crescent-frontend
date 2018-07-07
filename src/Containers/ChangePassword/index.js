import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { FormControl } from 'material-ui/Form';
import { TextField } from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import Button from '../../Components/Button';
import UserActions from '../../Actions/UserActions';
import Card from '../../Components/Card';
import StyledDiv from './styles';

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.newPassword !== values.newPasswordCheck) {
    errors.newPasswordCheck = 'New password fields are not matching';
  }
  return errors;
};
class ChangePassword extends React.Component {
  submit = (values) => {
    this.props.dispatch(UserActions.changePassword(values));
  };

  render = () => (
    <StyledDiv className="content">
      <form name="form" onSubmit={this.props.handleSubmit(this.submit)}>
        <Card width="500px" title="Lunar Testing - Change Password">
          <FormControl fullWidth>
            <Field name="email" label="Email Address" component={TextField} />
          </FormControl>
          <FormControl fullWidth>
            <Field
              name="password"
              label="Current Password"
              type="password"
              component={TextField}
            />
          </FormControl>
          <FormControl fullWidth>
            <Field
              name="newPassword"
              label="New Password"
              type="password"
              component={TextField}
            />
          </FormControl>
          <FormControl fullWidth>
            <Field
              name="newPasswordCheck"
              label="New Password Confirmation"
              type="password"
              component={TextField}
            />
          </FormControl>
          <br />
          <br />
          <div>
            <div className="alignRight">
              <Button variant="raised" color="primary" type="submit">
                Change Password
              </Button>
              {this.props.loading && <CircularProgress />}
            </div>
          </div>
        </Card>
      </form>
    </StyledDiv>
  );
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  loading: state.LoginReducer.loading,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withForm = reduxForm(
  {
    form: 'changePassword',
    validate,
  },
  ChangePassword,
);

export default compose(
  withForm,
  withConnect,
)(ChangePassword);
