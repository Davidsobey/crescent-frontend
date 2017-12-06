import React from "react";
import PropTypes from "prop-types";
import LoginComponent from "../components/login-component";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const img = require("../img/crescent.jpeg");

const styles = {
  card: {
    minWidth: 345
  },
  media: {
    height: 200
  }
};

function LoginContainer(props) {
  const { classes } = props;
  return (
    <div className="center">
      <div className="main-div">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              Login
            </Typography>
            <LoginComponent />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

LoginContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginContainer);
