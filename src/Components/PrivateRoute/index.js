import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      sessionStorage.getItem('user') // eslint-disable-line no-undef
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )}
  />
);

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func,
};

export default PrivateRoute;
