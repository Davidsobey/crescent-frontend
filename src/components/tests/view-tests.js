import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Paper from "material-ui/Paper";
import { Button } from "material-ui/";

import Dashboard from "../appBar/appBar";
import ExpansionPanel from "../expansion-panel";
import TestList from "./test-list";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  width: {
    width: "33.3%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.text.lightDivider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  secondary: {
    color: theme.palette.secondary[500]
  }
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
          additional="Test Completed"
          detail="Review Test"
        >
          <div className={classes.width} />
          <div className={classNames(classes.width, classes.helper)}>
            <Link to="/assesments/begin">
              <Button raised color="accent">
                Review Test
              </Button>
            </Link>
            <br />
            <Link to="/assesments/begin">
              <Button raised color="primary" to="/">
                Take Test
              </Button>
            </Link>
          </div>
          <div className={classNames(classes.width, classes.helper)}>
            Additional Content
          </div>
        </ExpansionPanel>
      </Paper>
    </Dashboard>
  );
}

ViewTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewTest);
