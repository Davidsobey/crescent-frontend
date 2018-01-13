import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import ExpansionPanelMUI, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center",
    margin: "0 39px"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.text.lightDivider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary[500],
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  marginTop: {
    marginTop: 16
  },
  secondary: {
    color: theme.palette.secondary[500]
  },
  displayInline: {
    display: "inline-flex",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center"
  },
  justify: {
    display: "inline-flex",
    flex: 1
  },
  width: {
    width: "33.3%"
  }
});

function ExpansionPanel(props) {
  const { classes, children } = props;
  return (
    <ExpansionPanelMUI className={classes.marginTop}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.justify}>
          <div className={classes.width}>
            <Typography type="headline">{props.title}</Typography>
          </div>
          <div className={classes.width}>
            <Typography type="headline">{props.additional}</Typography>
          </div>
          <div className={classes.width}>
            <Typography type="headline">{props.additional}</Typography>
          </div>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanelMUI>
  );
}

ExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExpansionPanel);
