import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';

import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import ClientActions from '../../../Actions/ClientActions';
import CourseActions from '../../../Actions/CourseActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

/* eslint-disable react/prefer-stateless-function */
class SubscriptionCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(CourseActions.getAll());
    this.props.dispatch(ClientActions.getAll());
  }
  
  componentWillMount () {
    if (this.props.user.role.name != 'Admin') {
      this.props.initialize({ clientID: this.props.user.clientId });
      this.props.dispatch(CourseActions.getAllUnsubscribed(this.props.user.clientId));
    }
  }
  
  loadUnsubscribedCourses = (values) => {
    this.props.dispatch(CourseActions.getAllUnsubscribed(values.target.value));
  };

  submit = (values) => {
    const subscription = Object.assign({}, values);
    this.props.dispatch(ClientActions.subscribe(subscription));
  };

  render() {
    const isValidTest = (test => Array.isArray(test.questionIds) ? test.questionIds.length : false);
    const isValidModule = (module => 
      (Array.isArray(module.moduleMaterialIds) ? module.moduleMaterialIds.length : false) && 
      (Array.isArray(module.testIds) ? module.tests.filter(isValidTest).length : false)
    );
    const isValidCourse = (course => Array.isArray(course.modules) ? course.modules.filter(isValidModule).length : false);
    const isUnsubscribedCourse = (course => {
      if (Array.isArray(this.props.unsubscribed_courses)) {
        let length = this.props.unsubscribed_courses
          .filter(unsubscribed_course => course.id == unsubscribed_course.id)
          .length;
        return length;
      }
      return false;
    });

    return (
      <Card width="600px" title="Subscribe To Course">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.clients_loading || this.props.courses_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Clients
                </div>
              ) : (
                <Field 
                  name="clientID" 
                  onChange={this.loadUnsubscribedCourses}
                  label="Client Name" 
                  component={Select} 
                  validate={[ required ]}
                >
                  {(Array.isArray(this.props.clients) ? this.props.clients : [])
                  .filter(client => this.props.user.role.name == 'Admin' || client.id == this.props.user.clientId)
                  .map(client => (
                    <MenuItem value={client.id} key={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </div>
            <div>
              {this.props.unsubscribed_courses_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses
                </div>
              ) : (
                <Field 
                  name="courseID" 
                  label="Course Name" 
                  component={Select} 
                  validate={[ required ]}
                >
                  {(Array.isArray(this.props.courses) ? this.props.courses : [])
                  .filter(isValidCourse)
                  .filter(isUnsubscribedCourse)
                  .map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </div>
          </div>
          {this.props.client_subscribing ? (
            <div style={{width: '400px'}}>
              <LinearProgress color="secondary" />
              Subscribing Client To Course
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Subscribe
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

SubscriptionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  clients: PropTypes.array,
  clients_loading: PropTypes.bool,
  unsubscribed_courses: PropTypes.array,
  unsubscribed_courses_loading: PropTypes.bool,
  client_subscribing: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  courses_loading: state.CourseReducer.loading,
  clients: state.ClientReducer.clients,
  clients_loading: state.ClientReducer.loading,
  unsubscribed_courses: state.CourseReducer.unsubscribed_courses,
  unsubscribed_courses_loading: state.CourseReducer.unsubscribed_courses_loading,
  client_subscribing: state.ClientReducer.subscribing,
  user: state.LoginReducer.user,
});

const withForm = reduxForm(
  {
    form: 'subscriptionCreate',
    validate,
  },
  SubscriptionCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(SubscriptionCreate);
