import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

function loadRows(obj, arr) {
  for (const prop in obj) {
    if (prop !== "id") {
      const value = obj[prop];
      arr.push(value);
    }
  }
  return arr;
}

function BasicTable(props) {
  const { classes, data, header } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {header.map(head => {
              return <TableCell key={head}>{head}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(obj => {
            const arr = [];
            loadRows(obj, arr);
            return (
              <TableRow key={obj.id}>
                {arr.map(value => <TableCell key={value}>{value}</TableCell>)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BasicTable);
