/**
 *
 * UserView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import Table from '../../../Components/Table';
import UserActions from '../../../Actions/UserActions';

const header = ['ID', 'Name', 'Email', 'Client', 'Role'];

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
    this.props.dispatch(UserActions.getAll());
  }

  manipulateData = users => {
    const data = [];
    users.forEach(user => {
      const newUser = {
        name: user.name,
        email: user.email,
        client: user.client.name,
        role: user.role.name,
      };
      data.push(newUser);
    });
    return data;
  };

  render() {
    const { users } = this.props;
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Client',
        accessor: 'client',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Edit/Delete',
        accessor: 'edit/delete',
        Cell: row => (
          <div>
            <Tooltip id="tooltip-delete" title="Edit">
              <IconButton
                aria-label="Edit"
                onClick={() => this.handleEdit(row.original)}
              >
                <StyledEdit />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-delete" title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={() => this.handleDelete(row.original)}
              >
                <StyledDelete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Card width="800px" title="User List">
          <div>
            <ReactTable
              columns={columns}
              data={this.manipulateData}
              filterable
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </div>
        </Card>
        <CustomModal
          obj={this.state && this.state.obj}
          /* eslint-disable no-return-assign */
          onRef={ref => (this.child = ref)}
          onClick={this.confirmDelete(this.state.obj)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.UserReducer.users,
});

const withForm = reduxForm(
  {
    form: 'userView',
  },
  UserView
);

UserView.propTypes = {
  users: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(UserView);
