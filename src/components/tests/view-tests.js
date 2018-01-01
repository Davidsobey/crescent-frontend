import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Paper from "material-ui/Paper";

import Dashboard from "../appBar/appBar";
import ExpansionPanel from "../expansion-panel";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

function ViewTest(props) {
  const { classes } = props;
  return (
    <Dashboard>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          Tests
        </Typography>
        <ExpansionPanel
          title="APRM - Test 1"
          additional="Test Compelted"
          detail="Review Test"
        />
        <ExpansionPanel
          title="APRM - Test 2"
          additional="Test Compelted"
          detail="Review Test"
        />
        <ExpansionPanel
          title="APRM - Test 3"
          additional="Test Uncomplete"
          detail="Take Test"
        />
        <ExpansionPanel
          title="PRM - Test 1"
          additional="Test Uncomplete"
          detail="Take Test"
        />
        <ExpansionPanel
          title="PRM - Test 2"
          additional="Test Uncomplete"
          detail="Take Test"
        />
        <ExpansionPanel
          title="PRM - Test 3"
          additional="Test Uncomplete"
          detail="Take Test"
        />
      </Paper>
    </Dashboard>
  );
}

ViewTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewTest);
