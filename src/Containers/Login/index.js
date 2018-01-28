import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { submit } from "redux-form";

import { FormControl } from "material-ui/Form";
import { TextField } from "redux-form-material-ui";
import { Field, reduxForm } from "redux-form";

import Card from "../../Components/Card";
import Button from "../../Components/Button";
import UserActions from "../../Actions/UserActions";

import Logo from "./../../Images/LogoText.png";

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.username = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};
class Login extends React.Component {
  submit = values => {
    this.props.dispatch(UserActions.login(values.email, values.password));
  };

  render = () => {
    const { handleSubmit } = this.props;
    const { dispatch } = this.props;
    return (
      <div className="content">
        <form name="form" onSubmit={this.props.handleSubmit(this.submit)}>
          <img src={Logo} className="center-img" width="200px" alt="Crescent" />
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
              <Button raised color="primary" type="submit">
                Login
              </Button>
            </div>
          </Card>
        </form>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

const withConnect = connect(null, mapDispatchToProps);

const withForm = reduxForm(
  {
    form: "login",
    validate
  },
  Login
);

export default compose(withForm, withConnect)(Login);
