import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import LoginComponent from "../components/login/login-component";
import HomeComponent from "../components/home/home-component";
import CourseView from "../components/courses/course-view";
import ViewTests from "../components/tests/view-tests";
import BeginTest from "../components/tests/begin-test";
import WriteTest from "../components/tests/write-test";


const AppRouter = () => (
  <BrowserRouter>
    {/* <Header isLoggedIn={true} /> */}
    <Switch>
      <Route path="/" component={LoginComponent} exact={true} />
      {/* <Route path="/signup" component={SignupPage} exact={true} /> */}
      <Route path="/home" component={HomeComponent} exact={true} />
      <Route path="/course/view" component={CourseView} />
      <Route path="/assesments/view" component={ViewTests} />
      <Route path="/assesments/begin" component={BeginTest} />
      <Route path="/assesments/write" component={WriteTest} />
      {/* <Route path="/help" component={HelpPage} /> */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
