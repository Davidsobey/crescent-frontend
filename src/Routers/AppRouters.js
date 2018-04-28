import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import withAuth from '../Middleware/withAuth';

import history from '../Helpers/History';
import AlertActions from '../Actions/AlertActions';
import UserActions from '../Actions/UserActions';
import Routes from './Routes';
import AppBar from '../Components/AppBar';

import Login from '../Containers/Login';
import Home from '../Containers/Home';
import CourseCreate from '../Containers/Course/CourseCreate/index';
import CourseList from '../Containers/Course/CourseView/index';
import ModuleCreate from '../Containers/Module/ModuleCreate/index';
import ModuleList from '../Containers/Module/ModuleView/index';
import MaterialCreate from '../Containers/Module/Material/MaterialCreate/index';
import TestCreate from '../Containers/Test/TestCreate/index';
import TestList from '../Containers/Test/TestView/index';
import QuestionList from '../Containers/Question/QuestionView/index';
import QuestionCreate from '../Containers/Question/QuestionCreate/index';
import UserCreate from '../Containers/User/UserCreate/index';
import UserView from '../Containers/User/UserView/index';
import EnrolmentCreate from '../Containers/User/UserEnrol/index';
import ClientView from '../Containers/Client/ClientView/index';
import ClientCreate from '../Containers/Client/ClientCreate/index';
import SubscriptionCreate from '../Containers/Client/ClientSubscribe/index';
import UsersCourseView from '../Containers/UserView/Courses/index';
import UserCourseDetail from '../Containers/UserView/Courses/CourseDetail';
import UsersModuleView from '../Containers/UserView/Modules/index';
import UserModuleDetail from '../Containers/UserView/Modules/ModuleDetail';
import UserTest from '../Containers/UserView/Test/index';
import TakeTest from '../Containers/UserView/Test/TakeTest';
import Question from '../Containers/UserView/Test/Question';
import TestEdit from '../Containers/Test/TestEdit/index';
import PolicyCreate from '../Containers/Policy/PolicyCreate/index';
import PolicyView from '../Containers/Policy/PolicyView/index';
import AcknowledgementCreate from '../Containers/Policy/PolicyAcknowledgement/Create';
import AcknowledgementList from '../Containers/Policy/PolicyAcknowledgement/List';
import AcknowledgePolicy from '../Containers/Policy/PolicyAcknowledgement/Acknowledge';


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
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
                <Route path={Routes.HOME} component={withAuth(Home)} exact />
                <Route
                  path={Routes.COURSE_CREATE}
                  component={withAuth(CourseCreate)}
                  exact
                />
                <Route
                  path={Routes.COURSE_VIEW}
                  component={withAuth(CourseList)}
                  exact
                />
                <Route
                  path={Routes.MODULE_CREATE}
                  component={withAuth(ModuleCreate)}
                  exact
                />
                <Route
                  path={Routes.MODULE_VIEW}
                  component={withAuth(ModuleList)}
                  exact
                />
                <Route
                  path={Routes.MATERIAL_CREATE}
                  component={withAuth(MaterialCreate)}
                  exact
                />
                <Route
                  path={Routes.TEST_CREATE}
                  component={withAuth(TestCreate)}
                  exact
                />
                <Route
                  path={Routes.TEST_VIEW}
                  component={withAuth(TestList)}
                  exact
                />
                <Route
                  path={Routes.QUESTION_CREATE}
                  component={withAuth(QuestionCreate)}
                  exact
                />
                <Route
                  path={Routes.QUESTION_VIEW}
                  component={withAuth(QuestionList)}
                  exact
                />
                <Route
                  path={Routes.USER_CREATE}
                  component={withAuth(UserCreate)}
                  exact
                />
                <Route
                  path={Routes.USER_VIEW}
                  component={withAuth(UserView)}
                  exact
                />
                <Route
                  path={Routes.USER_ENROL}
                  component={withAuth(EnrolmentCreate)}
                  exact
                />
                <Route
                  path={Routes.CLIENT_CREATE}
                  component={withAuth(ClientCreate)}
                  exact
                />
                <Route
                  path={Routes.CLIENT_CREATE}
                  component={withAuth(ClientCreate)}
                  exact
                />
                <Route
                  path={Routes.CLIENT_VIEW}
                  component={withAuth(ClientView)}
                  exact
                />
                <Route
                  path={Routes.CLIENT_SUBSCRIBE}
                  component={withAuth(SubscriptionCreate)}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_COURSES}
                  component={withAuth(UsersCourseView)}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_COURSE}
                  component={withAuth(UserCourseDetail)}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_MODULES}
                  component={withAuth(UsersModuleView)}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_MODULE}
                  component={withAuth(UserModuleDetail)}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_TEST}
                  component={withAuth(UserTest)}
                  exact
                />
                <Route
                  path={Routes.USERS_START_TEST}
                  component={withAuth(TakeTest)}
                  exact
                />
                <Route
                  path={Routes.USERS_QUESTION}
                  component={withAuth(Question)}
                  exact
                />
                <Route
                  path={Routes.TEST_EDIT}
                  component={withAuth(TestEdit)}
                  exact
                />
                <Route
                  path={Routes.POLICIES_VIEW}
                  component={withAuth(PolicyView)}
                  exact
                />
                <Route
                  path={Routes.POLICIES_CREATE}
                  component={withAuth(PolicyCreate)}
                  exact
                />
                <Route
                  path={Routes.ACKNOWLEDGEMENT_CREATE}
                  component={withAuth(AcknowledgementCreate)}
                  exact
                />
                <Route
                  path={Routes.ACKNOWLEDGEMENT_VIEW}
                  component={withAuth(AcknowledgementList)}
                  exact
                />
                <Route
                  path={Routes.ACKNOWLEDGE}
                  component={withAuth(AcknowledgePolicy)}
                  exact
                />
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
