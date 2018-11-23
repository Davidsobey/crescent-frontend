import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import withAuth from '../Middleware/withAuth';

import history from '../Helpers/History';
import AlertActions from '../Actions/AlertActions';
import Routes from './Routes';
import AppBar from '../Components/AppBar';
import Snackbar from '../Components/Snackbar';

import Login from '../Containers/Login';
import ChangePassword from '../Containers/ChangePassword';
import Home from '../Containers/Home';
import LoadingPage from '../Containers/Home/LoadingPage';
import CourseCreate from '../Containers/Course/CourseCreate/index';
import CourseList from '../Containers/Course/CourseView/index';
import CourseEdit from '../Containers/Course/CourseEdit/index';
import ModuleCreate from '../Containers/Module/ModuleCreate/index';
import ModuleList from '../Containers/Module/ModuleView/index';
import ModuleEdit from '../Containers/Module/ModuleEdit/index';
import MaterialCreate from '../Containers/Module/Material/MaterialCreate/index';
import ModuleMaterialDetails from '../Containers/Module/Material/MaterialDetails/index';
import ModuleMaterialView from '../Containers/Module/Material/MaterialView/index';
import TestCreate from '../Containers/Test/TestCreate/index';
import TestList from '../Containers/Test/TestView/index';
import QuestionList from '../Containers/Question/QuestionView/index';
import QuestionCreate from '../Containers/Question/QuestionCreate/index';
import QuestionEdit from '../Containers/Question/QuestionEdit/index';
import UserCreate from '../Containers/User/UserCreate/index';
import UserView from '../Containers/User/UserView/index';
import UserEdit from '../Containers/User/UserEdit/index';
import EnrolmentCreate from '../Containers/User/UserEnrol/index';
import EnrolmentList from '../Containers/User/UserEnrolView/index';
import ClientView from '../Containers/Client/ClientView/index';
import ClientCreate from '../Containers/Client/ClientCreate/index';
import PolicyView from '../Containers/Policy/PolicyView/index';
import PolicyCreate from '../Containers/Policy/PolicyCreate/index';
import PolicyEdit from '../Containers/Policy/PolicyEdit/index';
import PolicyMaterialCreate from '../Containers/Policy/Material/MaterialCreate/index';
import PolicyMaterialDetail from '../Containers/Policy/Material/MaterialDetails/index';
import PolicyMaterialView from '../Containers/Policy/Material/MaterialView/index';
import AcknowledgementCreate from '../Containers/Policy/Acknowledgement/Create';
import AcknowledgementView from '../Containers/Policy/Acknowledgement/View/index';
import AcknowledgementDetail from '../Containers/Policy/Acknowledgement/Detail/index';
import AcknowledgementMaterial from '../Containers/Policy/Acknowledgement/Material/index';
import ClientEdit from '../Containers/Client/ClientEdit/index';
import SubscriptionCreate from '../Containers/Client/ClientSubscribe/index';
import SubscriptionView from '../Containers/Client/ClientSubscribeView/index';
import UsersHome from '../Containers/UserView/Home';
import UsersCourseView from '../Containers/UserView/Courses/index';
import UserCourseDetail from '../Containers/UserView/Courses/CourseDetail';
import UsersModuleView from '../Containers/UserView/Modules/index';
import UserModuleDetail from '../Containers/UserView/Modules/ModuleDetail';
import UserTest from '../Containers/UserView/Test/index';
import TakeTest from '../Containers/UserView/Test/TakeTest';
import Question from '../Containers/UserView/Test/Question';
import TestEdit from '../Containers/Test/TestEdit/index';
import Options from '../Containers/Option/OptionCreate/index';
import UsersPolicyView from '../Containers/UserView/Policies/index';
import UserPolicyDetail from '../Containers/UserView/Policies/PolicyDetail';

class AppRouters extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(AlertActions.clear());
    });
  }

  render() {
    return (
      <div className="app">
        <Snackbar />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path={Routes.CHANGEPASSWORD} component={ChangePassword} exact />
            <AppBar role={this.props.role}>
              <Switch>
                {/* Authenticated Routes */}
                <Route
                  path={Routes.HOME}
                  component={withAuth(Home, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.LOADING_PAGE}
                  component={withAuth(LoadingPage, ['Admin', 'Client', 'Regular'])}
                  exact
                />
                <Route
                  path={Routes.COURSE_CREATE}
                  component={withAuth(CourseCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.COURSE_EDIT}
                  component={withAuth(CourseEdit, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.COURSE_VIEW}
                  component={withAuth(CourseList, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.MODULE_CREATE}
                  component={withAuth(ModuleCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.MODULE_VIEW}
                  component={withAuth(ModuleList, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.MODULE_EDIT}
                  component={withAuth(ModuleEdit, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.MATERIAL_CREATE}
                  component={withAuth(MaterialCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.MATERIAL_DETAILS}
                  component={withAuth(ModuleMaterialDetails, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.MATERIAL_VIEW}
                  component={withAuth(ModuleMaterialView, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.TEST_CREATE}
                  component={withAuth(TestCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.TEST_VIEW}
                  component={withAuth(TestList, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.QUESTION_CREATE}
                  component={withAuth(QuestionCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.QUESTION_VIEW}
                  component={withAuth(QuestionList, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.QUESTION_EDIT}
                  component={withAuth(QuestionEdit, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.OPTIONS}
                  component={withAuth(Options, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USER_CREATE}
                  component={withAuth(UserCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USER_VIEW}
                  component={withAuth(UserView, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USER_EDIT}
                  component={withAuth(UserEdit, ['Admin'])}
                  exact
                />
                <Route
                  path={Routes.USER_ENROL}
                  component={withAuth(EnrolmentCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USER_ENROL_VIEW}
                  component={withAuth(EnrolmentList, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.CLIENT_CREATE}
                  component={withAuth(ClientCreate, ['Admin'])}
                  exact
                />
                <Route
                  path={Routes.CLIENT_VIEW}
                  component={withAuth(ClientView, ['Admin'])}
                  exact
                />
                <Route
                  path={Routes.POLICY_CREATE}
                  component={withAuth(PolicyCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.POLICY_VIEW}
                  component={withAuth(PolicyView, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.POLICY_EDIT}
                  component={withAuth(PolicyEdit, ['Admin', 'Client'])}
                />
                <Route
                  path={Routes.POLICY_MATERIAL_CREATE}
                  component={withAuth(PolicyMaterialCreate, ['Admin', 'Client'])}
                />
                <Route
                  path={Routes.POLICY_MATERIAL_DETAILS}
                  component={withAuth(PolicyMaterialDetail, ['Admin', 'Client'])}
                />
                <Route
                  path={Routes.POLICY_MATERIAL_VIEW}
                  component={withAuth(PolicyMaterialView, ['Admin', 'Client'])}
                />
                <Route
                  path={Routes.POLICY_ACKNOWLEDGEMENT_CREATE}
                  component={withAuth(AcknowledgementCreate, ['Admin', 'Client'])}
                />
                <Route
                  path={Routes.POLICY_ACKNOWLEDGEMENT_VIEW}
                  component={withAuth(AcknowledgementView, ['Admin', 'Regular', 'Client'])}
                />
                <Route
                  path={Routes.POLICY_ACKNOWLEDGEMENT_DETAIL}
                  component={withAuth(AcknowledgementDetail, ['Admin', 'Regular', 'Client'])}
                />
                <Route
                  path={Routes.POLICY_ACKNOWLEDGEMENT_MATERIAL}
                  component={withAuth(AcknowledgementMaterial, ['Admin', 'Regular', 'Client'])}
                />
                <Route
                  path={Routes.CLIENT_EDIT}
                  component={withAuth(ClientEdit, ['Admin'])}
                  exact
                />
                <Route
                  path={Routes.CLIENT_SUBSCRIBE}
                  component={withAuth(SubscriptionCreate, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.CLIENT_SUBSCRIPTION_VIEW}
                  component={withAuth(SubscriptionView, ['Admin', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_HOME}
                  component={withAuth(UsersHome, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_COURSES}
                  component={withAuth(UsersCourseView, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_COURSE}
                  component={withAuth(UserCourseDetail, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_MODULES}
                  component={withAuth(UsersModuleView, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_MODULE}
                  component={withAuth(UserModuleDetail, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_TEST}
                  component={withAuth(UserTest, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_START_TEST}
                  component={withAuth(TakeTest, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_QUESTION}
                  component={withAuth(Question, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.TEST_EDIT}
                  component={withAuth(TestEdit, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_POLICIES}
                  component={withAuth(UsersPolicyView, ['Admin', 'Regular', 'Client'])}
                  exact
                />
                <Route
                  path={Routes.USERS_VIEW_POLICY}
                  component={withAuth(UserPolicyDetail, ['Admin', 'Regular', 'Client'])}
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
  role: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    role:
      state.LoginReducer.user && state.LoginReducer.user.role
        ? state.LoginReducer.user.role.name
        : '',
  };
}
export default connect(mapStateToProps)(AppRouters);
