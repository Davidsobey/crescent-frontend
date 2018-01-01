import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classnames from "classnames";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import CancelIcon from "material-ui-icons/Cancel";
import withWidth from "material-ui/utils/withWidth";

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginRight: 10
  },
  red: {
    background: "#F44336"
  },
  media: {
    height: 194
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  flexGrow: {
    flex: "1 1 auto"
  },
  displayInline: {
    display: "inline-flex",
    justifyContent: "space-between",
    width: 400,
    marginRight: 25
  },
  right: {
    display: "flex",
    alignItems: "center",
    marginRight: 20,
    color: "#c50003"
  }
});

class UncompletedCard extends React.Component {
  state = { expanded: false, expanded1: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleExpandClick1 = () => {
    this.setState({ expanded1: !this.state.expanded1 });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.displayInline}>
        <Card className={classes.card}>
          <div className={classes.displayInline}>
            <CardHeader title="Uncompleted Courses" />
            <div className={classes.right}>
              <CancelIcon />
            </div>
          </div>
          <Divider />
          <div className={classes.displayInline}>
            <CardContent>
              <Typography type="body2">
                APRM - Associate Professional Risk Manager
              </Typography>
            </CardContent>
            <CardActions>
              <div className={classes.flexGrow} />
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </div>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph type="body2">
                About:
              </Typography>
              <Typography paragraph>
                The Associate Professional Risk Manager (Associate PRM) is a
                PRMIA certificate program intended for staff entering the risk
                management profession, or those who interface with risk
                management disciplines on a regular basis, such as auditing,
                accounting, legal, and systems personnel who want to understand
                fundamental risk management methods and practices.
              </Typography>
            </CardContent>
          </Collapse>
          <div className={classes.displayInline}>
            <CardContent>
              <Typography type="body2">
                PRM - Professional Risk Manager
              </Typography>
            </CardContent>
            <CardActions>
              <div className={classes.flexGrow} />
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded1
                })}
                onClick={this.handleExpandClick1}
                aria-expanded={this.state.expanded1}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </div>
          <Collapse in={this.state.expanded1} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph type="body2">
                About:
              </Typography>
              <Typography paragraph>
                The Professional Risk Managers' International Association
                provides an open forum for the development and promotion of the
                risk profession. Learn More. PRM Designation. The Professional
                Risk Manager (PRM™) Designation is a globally recognized,
                graduate-level risk management credential.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

UncompletedCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UncompletedCard);
