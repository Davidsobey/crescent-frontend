import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Paper from "material-ui/Paper";

import ExpansionPanel from "../expansion-panel";
import Dashboard from "../appBar/appBar";
import TestList from "../tests/test-list";

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
  }
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
          additional="Assesments"
          detail="Additional Content"
        >
          <div className={classes.width} />
          <div className={classNames(classes.width, classes.helper)}>
            <TestList />
          </div>
          <div className={classNames(classes.width, classes.helper)}>
            Additional Content
          </div>
        </ExpansionPanel>
      </Paper>
    </Dashboard>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailedExpansionPanel);
