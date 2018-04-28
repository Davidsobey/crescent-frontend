import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';
import Collapse from 'material-ui/transitions/Collapse';

import MenuItem from './MenuItem';

const styles = {
  accentColor: {
    color: 'white',
    fontSize: '14px',
  },
};

class ExpandableMenu extends React.Component {
  state = { menuItem: false };
  handleClick = () => {
    const newItem = this.props.details.listName;

    if (newItem && newItem !== this.state.menuItem) {
      this.setState({ menuItem: newItem });
    }

    if (!newItem || newItem === this.state.menuItem) {
      this.setState({ menuItem: false });
    }
  };

  render() {
    const { details, classes } = this.props;

    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon className={classes.accentColor}>
            {details.listIcon}
          </ListItemIcon>
          <ListItemText
            inset
            className={classes.accentColor}
            disableTypography
            primary={details.listName}
          />
          {this.state.menuItem === details.listName ? (
            <ExpandLess className={classes.accentColor} />
          ) : (
            <ExpandMore className={classes.accentColor} />
          )}
        </ListItem>
        <Collapse
          component="li"
          in={this.state.menuItem === details.listName}
          timeout="auto"
          unmountOnExit
        >
          {details.subItems.map(item => (
            <MenuItem
              key={item.key}
              target={details.listName}
              option={item.subItemName}
              icon={item.subItemIcon}
              extention={item.subItemExtension}
            />
          ))}
        </Collapse>
      </div>
    );
  }
}

ExpandableMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpandableMenu);
