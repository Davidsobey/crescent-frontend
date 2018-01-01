import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";

import Dashboard from "../appBar/appBar";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

function BeginTest(props) {
  const { classes } = props;
  return (
    <Dashboard>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          APRM Test 1
        </Typography>
        <Typography type="subheading" component="h3">
          Test instructions
        </Typography>
        <Divider />
        <br />
        <Typography type="body2" component="h3">
          You are about to begin APRM Test 1.
        </Typography>
        <Typography type="body2" component="h3">
          The test consists of 50 questions to answer.
        </Typography>
        <Typography type="body2" component="h3">
          Once you are done click on the complete test button, the test will be
          graded and your result will be displayed.
        </Typography>
        <Link to="/tests/write">
          <Button raised color="primary" to="/">
            Begin Test
          </Button>
        </Link>
      </Paper>
    </Dashboard>
  );
}

BeginTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BeginTest);
