import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";
import Radio, { RadioGroup } from "material-ui/Radio";
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";

import Dashboard from "../appBar/appBar";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  displayEnd: {
    justifyContent: "flex-end",
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});
class WriteTest extends React.Component {
  state = {
    value: ""
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Dashboard>
        <Paper className={classes.root} elevation={4}>
          <Typography type="headline" component="h3">
            Question 1
          </Typography>
          <Divider />
          <br />
          <div>
            <Typography type="body2" component="h3">
              Question 1 Text
            </Typography>
            <FormControl
              component="fieldset"
              required
              className={classes.formControl}
            >
              <RadioGroup
                aria-label="gender"
                name="gender1"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Option 1"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Option 2"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Option 3"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className={classes.displayEnd}>
            <Link to="/tests/write">
              <Button raised color="primary" to="/">
                Next Question
              </Button>
            </Link>
          </div>
        </Paper>
      </Dashboard>
    );
  }
}
WriteTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WriteTest);
