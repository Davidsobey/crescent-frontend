import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";

import Person from "../../images/person.svg";

const styles = theme => ({
  card: {
    display: "inline-flex",
    maxWidth: 450,
    marginTop: 20,
    marginBottom: 20
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: 300
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    padding: 25,
    width: 50,
    height: 50
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

function UserCard(props) {
  const { classes, theme } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={Person}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography type="headline">David Sobey</Typography>
          <Typography type="subheading" color="secondary">
            davidsobey@live.co.uk
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserCard);
