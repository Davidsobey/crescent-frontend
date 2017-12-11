import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import LoginComponent from '../components/login/login-component';
import HomeComponent from '../components/home/home-component';


const AppRouter = () => (
  <BrowserRouter>
      {/* <Header isLoggedIn={true} /> */}
      <Switch>
        <Route path="/" component={LoginComponent} exact={true} />
        {/* <Route path="/signup" component={SignupPage} exact={true} /> */}
        <Route path="/home" component={HomeComponent} exact={true} />
        {/* <Route path="/test" component={TestPage} /> */}
        {/* <Route path="/help" component={HelpPage} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
  </BrowserRouter>
);

export default AppRouter;
