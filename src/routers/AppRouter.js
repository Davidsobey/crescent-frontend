import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import LoginController from '../container/login-controller';

const AppRouter = () => (
  <BrowserRouter>
      {/* <Header isLoggedIn={true} /> */}
      <Switch>
        <Route path="/" component={LoginController} exact={true} />
        {/* <Route path="/signup" component={SignupPage} exact={true} />
        <Route path="/home" component={HomePage} />
        <Route path="/test" component={TestPage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFound} /> */}
      </Switch>
  </BrowserRouter>
);

export default AppRouter;
