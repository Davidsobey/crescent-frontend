import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import LoginPage from '../components/LoginPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      {/* <Header isLoggedIn={true} /> */}
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        {/* <Route path="/signup" component={SignupPage} exact={true} />
        <Route path="/home" component={HomePage} />
        <Route path="/test" component={TestPage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFound} /> */}
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
