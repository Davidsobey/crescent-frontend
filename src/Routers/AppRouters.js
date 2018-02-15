import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import history from '../Helpers/History';
import AlertActions from '../Actions/AlertActions';
import UserActions from '../Actions/UserActions';
import Routes from './Routes';
import AppBar from '../Components/AppBar';

import Login from '../Containers/Login';
import Home from '../Containers/Home';
import CourseCreate from '../Containers/Course/CourseCreate';
import CourseList from '../Containers/Course/CourseView';
import ModuleCreate from '../Containers/Module/ModuleCreate';
import ModuleList from '../Containers/Module/ModuleView';
import TestCreate from '../Containers/Test/TestCreate';
import TestList from '../Containers/Test/TestView';
import UserCreate from '../Containers/User/UserCreate';
import UserView from '../Containers/User/UserView';

class AppRouters extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(AlertActions.clear());
    });
  }

  handleClose = () => {
    this.props.dispatch(UserActions.close());
  };

  render() {
    return (
      <div className="app">
        <Snackbar
          open={this.props.open}
          onClose={this.handleClose}
          direction="up"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.alert}</span>}
        />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <AppBar>
              <Switch>
                {/* Authenticated Routes */}
                <Route path={Routes.HOME} component={Home} exact />
                <Route
                  path={Routes.COURSE_CREATE}
                  component={CourseCreate}
                  exact
                />
                <Route path={Routes.COURSE_VIEW} component={CourseList} exact />
                <Route
                  path={Routes.MODULE_CREATE}
                  component={ModuleCreate}
                  exact
                />
                <Route path={Routes.MODULE_VIEW} component={ModuleList} exact />
                <Route path={Routes.TEST_CREATE} component={TestCreate} exact />
                <Route path={Routes.TEST_VIEW} component={TestList} exact />
                <Route path={Routes.USER_CREATE} component={UserCreate} exact />
                <Route path={Routes.USER_VIEW} component={UserView} exact />
              </Switch>
            </AppBar>
          </Switch>
        </Router>
      </div>
    );
  }
}

AppRouters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.bool,
  alert: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    alert: state.AlertReducer.message,
    open: state.AlertReducer.open,
  };
}

export default connect(mapStateToProps)(AppRouters);
