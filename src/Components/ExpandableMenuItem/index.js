import React from "react";
import PropTypes from "prop-types";

import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import HomeIcon from "material-ui-icons/Home";
import ListIcon from "material-ui-icons/List";
import { withStyles } from "material-ui/styles";
import DomainIcon from "material-ui-icons/Domain";
import PeopleIcon from "material-ui-icons/People";
import ExpandMore from "material-ui-icons/ExpandMore";
import ExpandLess from "material-ui-icons/ExpandLess";
import Collapse from "material-ui/transitions/Collapse";
import AssignmentIcon from "material-ui-icons/Assignment";
import AssessmentIcon from "material-ui-icons/Assessment";
import AddBoxIcon from "material-ui-icons/AddBox";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class ExpandableMenuItem extends React.Component {
  state = { menuItem: false };

  handleClick = listItem => {
    const newItem = this.props.target;

    if (newItem && newItem !== this.state.menuItem) {
      this.setState({ menuItem: newItem });
    }

    if (!newItem || newItem === this.state.menuItem) {
      this.setState({ menuItem: false });
    }
  };

  render() {
    const { classes, target, option1, option2 } = this.props;

    return (
      <div className={classes.root}>
        <ListItem
          button
          onClick={this.handleClick}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText inset primary={target} />
          {this.state.menuItem === target ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          component="li"
          in={this.state.menuItem === target}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            <Link to={`/${target}/${option1}`}>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary={option1}/>
              </ListItem>
            </Link>
          </List>
          <List disablePadding>
            <Link to={`/${target}/${option2}`}>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary={option2} />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </div>
    );
  }
}

ExpandableMenuItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExpandableMenuItem);
