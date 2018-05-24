import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserServices from '../Services/UserService';
import AuthMiddleware from './AuthMiddleware';

export default function withAuth(AuthComponent, AllowedRoles) {
  const Auth = new AuthMiddleware('');

  class AuthWrapped extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
      role: PropTypes.string.isRequired,
    };
    constructor() {
      super();
      this.roleCheck = this.roleCheck.bind(this);
    }
    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
          });
        } catch (err) {
          UserServices.logout();
          this.props.history.replace('/');
        }
      }
    }

    roleCheck(roles, userRole) {
      let isValidRole = false;
      if (roles) {
        roles.map((role) => {
          if (!isValidRole) {
            if (role === userRole) {
              isValidRole = true;
            }
          }
          return isValidRole;
        });
      } else {
        isValidRole = true;
      }

      return isValidRole;
    }

    render() {
      if (this.state.user) {
        if (this.roleCheck(AllowedRoles, this.props.role)) {
          return <AuthComponent history={this.props.history} />;
        }
      }
      return <div>Sorry you are not authorized!</div>;
    }
  }
  const mapStateToProps = state => ({
    role: state.LoginReducer.user.role.name,
  });

  return connect(mapStateToProps)(AuthWrapped);
}