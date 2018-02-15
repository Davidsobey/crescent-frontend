/**
 *
 * UserCreate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import UserActions from '../../../Actions/UserActions';

const validate = () => {
  const errors = {};

  return errors;
};

class UserCreate extends React.Component {
    submit = (values) => {
      const user = Object.assign({}, values);
      this.props.dispatch(UserActions.register(user));
    };

    render() {
      return (
        <Card width="600px" title="Create New User">
          <form
            onSubmit={this.props.handleSubmit(this.submit)}
            noValidate
            autoComplete="off"
          >
            <div>
              <div>
                <Field
                  name="email"
                  label="Email"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="name"
                  label="Name"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="clientId"
                  label="Client ID"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="roleId"
                  label="Role ID"
                  margin="normal"
                  component={TextField}
                />
              </div>
            </div>
            <div className="alignRight">
              <Button color="primary" type="submit">
                Create User
              </Button>
            </div>
          </form>
        </Card>
      );
    }
}

UserCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const withForm = reduxForm(
  {
    form: 'userCreate',
    validate,
  },
  UserCreate,
);

export default compose(withForm)(UserCreate);
