import React from "react";
import { TextField } from "material-ui";
import Button from "material-ui/Button";

const LoginComponent = () => (
  <form>
    <div className="flex-container">
      <div className="row">
        <TextField className="flex-item" />
        <br />
        <TextField className="flex-item" />
        <br />
        <Button color="primary" raised className="flex-item">
          Default
        </Button>
      </div>
    </div>
  </form>
);

export default LoginComponent;
