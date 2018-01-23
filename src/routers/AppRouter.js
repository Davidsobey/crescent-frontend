import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";

import Login from "../Containers/Login";
import { AlertActions } from "../Actions/AlertActions";
import { debug } from "util";

const history = createBrowserHistory();

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(AlertActions.clear());
    });
  }

  render() {
    const { AlertReducer } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          {alert.message && <div>test</div>}
          <Route path="/" component={Login} exact={true} />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { AlertReducer } = state;
  return {
    AlertReducer
  };
}

const connectedApp = connect(mapStateToProps)(AppRouter);
export { connectedApp as AppRouter };
