import React from "react";
import PropTypes from "prop-types";
import { Card, Button, CardHeader } from "material-ui";
import { LockOutline, Person } from "material-ui-icons/";
import IconButton from "material-ui/IconButton";
import Grid from "material-ui/Grid";
import { FormControl } from "material-ui/Form";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";
import { Link } from "react-router-dom";

const Logo = require("../../images/LogoText.png");

class LoginComponent extends React.Component {
  state = {
    amount: "",
    password: "",
    username: "",
    showPassword: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render = () => (
    <div className="mainDiv">
      <img src={Logo} className="img-center" width="200px" alt="Crescent" />
      <div>
        <form>
          <Card color="primary" raised className="card">
            <div className="row center">
              <LockOutline className="pushdown" />
              <CardHeader title="Crescent Testing Login" />
            </div>
            <FormControl fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                value={this.state.username}
                onChange={this.handleChange("username")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton disabled>
                      <Person className="black" />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
            <br />
            <div>
              <Link className="login" to="./home">
                <Button raised color="primary">
                  Login
                </Button>
              </Link>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
