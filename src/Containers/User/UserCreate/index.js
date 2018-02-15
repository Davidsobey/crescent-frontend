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
      this.props.dispatch(UserActions.create(values.userName, values.userEmail));
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
                  name="userEmail"
                  label="Email"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="userName"
                  label="Name"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="clientID"
                  label="Client ID"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="roleID"
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
