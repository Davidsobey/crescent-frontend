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
              {this.props.courses ? (
                <Field name="course" label="Course Name" component={Select}>
                  {this.props.courses.map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses
                </div>
              )}
              {this.props.clients ? (
                <Field name="client" label="Client Name" component={Select}>
                  {this.props.clients.map(client => (
                    <MenuItem value={client.id} key={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Clients
                </div>
              )}
            </div>
          </div>
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
        </form>
      </Card>
    );
  }
}

SubscriptionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  clients: PropTypes.array,
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  clients: state.ClientReducer.clients,
});

const withForm = reduxForm(
  {
    form: 'subscriptionCreate',
    validate,
  },
  SubscriptionCreate,
);

export default compose(connect(mapStateToProps), withForm)(SubscriptionCreate);
