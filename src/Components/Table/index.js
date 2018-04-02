import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import { Paper, Tooltip, IconButton } from 'material-ui';
import { Edit, Delete } from 'material-ui-icons';

import { Actions } from './styles';
import CustomModal from '../../Components/Modal';
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

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: this.props.data[0] };
  }

  handleDelete = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  render() {
    const {
      classes, data, header, del, edit,
    } = this.props;
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
                  {(del || edit) && (
                    <TableCell>
                      <Actions>
                        {edit && (
                          <Tooltip id="tooltip-edit" title="Edit">
                            <IconButton
                              className={classes.button}
                              color="primary"
                              aria-label="Edit"
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                        )}
                        {del && (
                          <Tooltip id="tooltip-delete" title="Delete">
                            <IconButton
                              color="secondary"
                              aria-label="Delete"
                              onClick={() => this.handleDelete(obj)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Actions>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            <CustomModal
              del={del}
              obj={this.state && this.state.obj}
              /* eslint-disable no-return-assign */
              onRef={ref => (this.child = ref)}
            />
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  header: PropTypes.array.isRequired,
  del: PropTypes.string,
  edit: PropTypes.string,
};

export default withStyles(styles)(BasicTable);
