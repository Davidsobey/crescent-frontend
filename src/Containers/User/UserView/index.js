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

const header = ['ID', 'Name', 'Email'];

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(UserActions.getAll());
  }
  render() {
    const { users } = this.props;
    return (
      <Card width="800px" title="User List">
        {Array.isArray(users) ? (
          <Table header={header} data={users} />
              ) : (
                <div className="center">
                  <CircularProgress color="secondary" />
                </div>
              )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  users: state.UserReducer.users,
});

const withForm = reduxForm(
  {
    form: 'courseView',
  },
  UserView,
);

UserView.propTypes = {
  users: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(UserView);
