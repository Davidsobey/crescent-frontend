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
import Image from '../../Images/Logo.png';

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
class Login extends React.Component {
  submit = (values) => {
    this.props.dispatch(UserActions.login(values.email, values.password));
  };

  render = () => (
    <div className="content">
      <form name="form" onSubmit={this.props.handleSubmit(this.submit)}>
        <img src={Image} className="center-img" width="200px" alt="Crescent" />
        <Card width="500px" title="Lunar Testing Login">
          <br />
          <br />
          <FormControl fullWidth>
            <Field name="email" label="Email Address" component={TextField} />
          </FormControl>
          <FormControl fullWidth>
            <Field
              name="password"
              label="Password"
              type="password"
              component={TextField}
            />
          </FormControl>
          <br />
          <br />
          <div className="alignRight">
            {this.props.loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button variant="raised" color="primary" type="submit">
                Login
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  loading: state.AuthenticationReducer.loading,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withForm = reduxForm(
  {
    form: 'login',
    validate,
  },
  Login,
);

export default compose(withForm, withConnect)(Login);
