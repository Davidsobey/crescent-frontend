import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Actions } from './styles';
import Button from '../Button';

const styles = () => ({
  table: {
    minWidth: 700,
  },
});

function loadRows(obj, arr) {
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] && !Array.isArray(obj[prop])) {
      arr.push(obj[prop]);
    }
  });
  return arr;
}

function BasicTable(props) {
  const { classes, data, header } = props;
  let count = 0;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {header.map(head => <TableCell key={head}>{head}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((obj) => {
            const arr = [];
            loadRows(obj, arr);
            return (
              <TableRow key={obj.id}>
                {arr.map((value) => {
                  count += 1;
                  if (typeof value === 'object') {
                    return (
                      <TableCell key={count}>
                        <Actions>
                          <Button
                            className="small-font"
                            color="primary"
                            onClick={value.onClick}
                          >
                            {value.message}
                          </Button>
                        </Actions>
                      </TableCell>
                    );
                  }
                  return <TableCell key={count}>{value}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  header: PropTypes.array.isRequired,
};

export default withStyles(styles)(BasicTable);
