import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Login from "../Containers/Login";
import Home from "../Containers/Home";
import CourseCreate from "../Containers/Course/CourseCreate";
import CourseView from "../Containers/Course/CourseView";
import history from "../Helpers/History";
import { AlertActions } from "../Actions/AlertActions";

class ARouter extends React.Component {
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
      <Router history={history}>
        <Switch>
          {alert.message && <div>test</div>}
          <Route path="/" component={Login} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/course/create" component={CourseCreate} exact={true} />
          <Route path="/course/list" component={CourseView} exact={true} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { AlertReducer } = state;
  return {
    AlertReducer
  };
}

const AppRouter = connect(mapStateToProps)(ARouter);
export default AppRouter;
