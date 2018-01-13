import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classnames from "classnames";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import ThumbUpIcon from "material-ui-icons/ThumbUp";

const styles = theme => 
({
  card: {
    maxWidth: 400,
    marginRight: 10
  },
  green: {
    background: "#4CAF50"
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
    color: theme.palette.secondary[500]
  }
  
});

class CompletedCard extends React.Component {
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
            <CardHeader title="Completed Courses" />
            <div className={classes.right}>
              <ThumbUpIcon />
            </div>
          </div>
          <Divider />
          <div className={classes.displayInline}>
            <CardContent>
              <Typography type="body2">CFA 1</Typography>
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
                CFA Institute is a global association of investment
                professionals. The organization offers the Chartered Financial
                Analyst designation, the Certificate in Investment Performance
                Measurement designation, and the Investment Foundations
                Certificate.
              </Typography>
            </CardContent>
          </Collapse>
          <div className={classes.displayInline}>
            <CardContent>
              <Typography type="body2">CFA 2</Typography>
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
                CFA Institute is a global association of investment
                professionals. The organization offers the Chartered Financial
                Analyst designation, the Certificate in Investment Performance
                Measurement designation, and the Investment Foundations
                Certificate.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

CompletedCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CompletedCard);
