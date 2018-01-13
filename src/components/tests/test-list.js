import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import StarIcon from "material-ui-icons/Star";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  noPad: {
    paddingLeft: "0 !important"
  }
});

function InsetList(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      <ListItem button>
        <ListItemText
          className={classes.noPad}
          inset
          primary="Test 1: 55/100"
        />
      </ListItem>
      <ListItem button>
        <ListItemText className={classes.noPad} inset primary="Test 2: 45/100" />
      </ListItem>
    </List>
  );
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InsetList);
