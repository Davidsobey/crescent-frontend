import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Paper from "material-ui/Paper";

import ExpansionPanel from "../expansion-panel";
import Dashboard from "../appBar/appBar";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

function DetailedExpansionPanel(props) {
  const { classes } = props;
  return (
    <Dashboard>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          Available Courses
        </Typography>
        <ExpansionPanel
          title="APRM"
          additional="Test Compelted 2/3"
          detail="Additional Material"
        />
        <ExpansionPanel
          title="PRM"
          additional="Test Compelted 0/3"
          detail="Additional Material"
        />
      </Paper>
    </Dashboard>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailedExpansionPanel);
