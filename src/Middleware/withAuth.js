import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserServices from '../Services/UserService';
import AuthMiddleware from './AuthMiddleware';

export default function withAuth(AuthComponent) {
  const Auth = new AuthMiddleware('');
  return class AuthWrapped extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
    };

    constructor() {
      super();
      this.state = {
        user: null,
      };
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

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      }
      return null;
    }
  };
}
