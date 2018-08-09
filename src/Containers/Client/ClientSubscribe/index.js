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
              {this.props.courses_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses
                </div>
              ) : (
                <Field name="courseID" label="Course Name" component={Select} validate={[ required ]}>
                  {this.props.courses
                  .filter(isValidCourse)
                  .map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </div>
            <div>
              {this.props.clients_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Clients
                </div>
              ) : (
                <Field name="clientID" label="Client Name" component={Select} validate={[ required ]}>
                  {this.props.clients.map(client => (
                    <MenuItem value={client.id} key={client.id}>
                      {client.name}
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
  client_subscribing: PropTypes.bool,
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  courses_loading: state.CourseReducer.loading,
  clients: state.ClientReducer.clients,
  clients_loading: state.ClientReducer.loading,
  client_subscribing: state.ClientReducer.subscribing,
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
