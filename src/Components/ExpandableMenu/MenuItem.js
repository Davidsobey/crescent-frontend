import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  accentColor: {
    color: 'white',
    fontSize: '14px',
  },
});

function MenuItem(props) {
  const {
    target, option, classes, icon, extention,
  } = props;
  return (
    <List disablePadding>
      <Link to={`/${target.toLowerCase()}/${extention}`}>
        <ListItem button className={classes.nested}>
          <ListItemIcon className={classes.accentColor}>{icon}</ListItemIcon>
          <ListItemText
            className={classes.accentColor}
            inset
            disableTypography
            primary={option}
          />
        </ListItem>
      </Link>
    </List>
  );
}

MenuItem.propTypes = {
  target: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  extention: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuItem);
