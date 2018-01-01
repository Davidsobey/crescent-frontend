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
  column: {
    flexBasis: "33.3%"
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
  green: {
    backgroundColor: "#8BC34A"
  },
  red: {
    backgroundColor: "#c50003"
  },
  displayInline: {
    display: "inline-flex",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center"
  }
});

function ExpansionPanel(props) {
  const { classes } = props;
  return (
    <ExpansionPanelMUI className={classes.marginTop}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.column}>
          <Typography type="headline">{props.title}</Typography>
        </div>
        <div className={classes.column}>
          <Typography type="headline">{props.additional}</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column} />
        {props.detail === "Review Test" && (
          <div className={classes.column}>
            <div>
              <Typography type="body2">Test: 33/50</Typography>
            </div>
          </div>
        )}
        {props.detail === "Take Test" && (
          <div className={classes.column}>
            <div>
              <Typography type="body2">Test: Not Taken</Typography>
            </div>
          </div>
        )}
        {props.detail === "Additional Material" && (
          <div className={classNames(classes.column, classes.helper)}>
            <div className={classes.displayInline}>
              <Typography type="body2">Test 1: 33/50</Typography>
              <Button className={classes.green}>Review</Button>
            </div>
            <div className={classes.displayInline}>
              <Typography type="body2">Test 2: 25/50</Typography>
              <Button className={classes.green}>Review</Button>
            </div>
            <div className={classes.displayInline}>
              <Typography type="body2">Test 3: 24/50</Typography>
              <Button className={classes.red}>Retake</Button>
            </div>
          </div>
        )}
        {props.detail === "Additional Material" && (
          <div className={classNames(classes.column, classes.helper)}>
            <Typography type="caption">
              {props.detail}
              <br />
              <a href="#sub-labels-and-columns" className={classes.link}>
                PDF1.pdf
              </a>
            </Typography>
          </div>
        )}

        {props.detail === "Review Test" && (
          <Link to="/tests/begin">
            <Button raised color="default" className={classes.green}>
              {props.detail}
            </Button>
          </Link>
        )}
        {props.detail === "Take Test" && (
          <Link to="/tests/begin">
            <Button raised color="primary" to="/">
              {props.detail}
            </Button>
          </Link>
        )}
      </ExpansionPanelDetails>
    </ExpansionPanelMUI>
  );
}

ExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExpansionPanel);
