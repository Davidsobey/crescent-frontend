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

import { Actions, StyledEdit, StyledDelete } from './styles';
import CustomModal from '../../Components/Modal/index';
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

  handleEdit(testObject) {
    this.props.handleEdit(testObject);
  }

  confirmDelete = id => () => {
    console.log(id);
  };

  // handleEdit = (editObj) => {
  //   this.props.dispatch(editObj);
  // };

  render() {
    const {
      data, header, del, edit,
    } = this.props;
    let count = 0;
    return (
      <Paper>
        <Table>
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
                              aria-label="Edit"
                              onClick={() => this.handleEdit(obj)}
                            >
                              <StyledEdit />
                            </IconButton>
                          </Tooltip>
                        )}
                        {del && (
                          <Tooltip id="tooltip-delete" title="Delete">
                            <IconButton
                              aria-label="Delete"
                              onClick={() => this.handleDelete(obj)}
                            >
                              <StyledDelete />
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
              onClick={this.confirmDelete(this.state.obj)}
            />
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

BasicTable.propTypes = {
  data: PropTypes.array.isRequired,
  header: PropTypes.array.isRequired,
  del: PropTypes.string,
  edit: PropTypes.string,
  handleEdit: PropTypes.func,
};

export default withStyles(styles)(BasicTable);
