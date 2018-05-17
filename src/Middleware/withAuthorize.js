import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function withAuthorize(AuthComponent, AllowedRoles) {
  class AuthWrapped extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
      role: PropTypes.string.isRequired,
    };
    constructor() {
      super();
      this.roleCheck = this.roleCheck.bind(this);
    }

    roleCheck(roles, userRole) {
      let isValidRole = false;
      roles.map((role) => {
        if (!isValidRole) {
          if (role === userRole) {
            isValidRole = true;
          }
        }
        return isValidRole;
      });
      return isValidRole;
    }

    render() {
      if (this.roleCheck(AllowedRoles, this.props.role)) {
        return <AuthComponent history={this.props.history} />;
      }
      return null;
    }
  }
  const mapStateToProps = state => ({
    role: state.UserReducer.user.role.name,
  });

  return connect(mapStateToProps)(AuthWrapped);
}
