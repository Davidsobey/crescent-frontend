import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom';
import Login from '../../Containers/Login';

function PrivateRoute(props) {
  const { user, component, path } = props;
  return (
    user ? (
      <Route path={path} component={component} exact />
    ) : (
      <Route path="/" component={Login} exact />
    )
  );
}

PrivateRoute.propTypes = {
  user: PropTypes.string,
  component: PropTypes.func,
  path: PropTypes.string,
};

export default PrivateRoute;
