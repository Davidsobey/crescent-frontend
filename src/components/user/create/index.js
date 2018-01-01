import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";
import Card, { CardHeader, CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/Menu/MenuItem";
import TextField from "material-ui/TextField";
import Input, { InputLabel } from "material-ui/Input";
import {
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";
import Radio, { RadioGroup } from "material-ui/Radio";
import Select from "material-ui/Select";
import Button from "material-ui/Button";

import Dashboard from "../../appBar/appBar";

const styles = theme => ({
  flexGrow: {
    flex: "1 1 auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

class ClientCreate extends React.Component {
  state = {
    expanded: false,
    age: "",
    value: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleDropDownChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRadioChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dashboard>
        <Card className="card" style={{ maxWidth: 800 }}>
          <CardHeader title="Create Supplier" />
          <Divider light />
          <CardContent>
            <form className={classes.container} noValidate autoComplete="off">
              <div className="row">
                <TextField
                  id="supplierName"
                  label="Suplier Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("supplierName")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <TextField
                  id="supplierAddress"
                  label="Supplier Address"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("supplierAddress")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <TextField
                  id="shippingAddress"
                  label="Shipping Address"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("shippingAddress")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <TextField
                  id="portOfLoad"
                  label="Port Of Load"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("portOfLoad")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <TextField
                  id="portOfDischard"
                  label="Port Of Dischard"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("portOfDischard")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <TextField
                  id="supplierContactPerson"
                  label="Supplier Contact Person"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("supplierContactPerson")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <TextField
                  id="supplierContactNumber"
                  label="Supplier Contact Number"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("supplierContactNumber")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <TextField
                  id="supplierContactEmail"
                  label="Supplier Contact Email"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("supplierContactEmail")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <TextField
                  id="supplierContactEmail"
                  label="Supplier Contact Email"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("supplierContactEmail")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <div className="inline">
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-helper">Incoterms</InputLabel>
                    <Select
                      value={this.state.age}
                      onChange={this.handleDropDownChange}
                      input={<Input name="age" id="age-helper" />}
                    >
                      <MenuItem value={1}>Ex Works</MenuItem>
                      <MenuItem value={2}>Free Carrier</MenuItem>
                      <MenuItem value={3}>Free Alongside Ship</MenuItem>
                      <MenuItem value={4}>Free On Board</MenuItem>
                    </Select>
                    <FormHelperText>Incoterms for the shipment</FormHelperText>
                  </FormControl>
                </div>
              </div>
              <div className="row">
                <TextField
                  id="supplierCurrency"
                  label="Supplier Currency"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("supplierCurrency")}
                  margin="normal"
                />
              </div>
              <div className="row">
                <Typography>
                  Will your supplier provide the relevant trade documents if
                  applicable?
                </Typography>
                <RadioGroup
                  aria-label="Y/N"
                  name="Y/N"
                  className={classes.group}
                  value={this.state.value}
                  onChange={this.handleRadioChange}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </div>
            </form>

            <Button raised className={classes.button}>
              Back
            </Button>
            <Button raised color="primary" className={classes.button}>
              Save
            </Button>
          </CardContent>
        </Card>
      </Dashboard>
    );
  }
}

ClientCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientCreate);
