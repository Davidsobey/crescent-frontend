/**
 *
 * UserCreate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import UserActions from '../../../Actions/UserActions';
import ClientActions from '../../../Actions/ClientActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};

class UserCreate extends React.Component {
  componentDidMount() {
    this.props.dispatch(ClientActions.getAll());
    this.props.dispatch(UserActions.getAllRoles());
  }

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
          className="centerForm"
        >
          <div>
            {this.props.clients ? (
              <Field name="clientId" label="Client Name" component={Select}>
                {this.props.clients.map(client => (
                  <MenuItem value={client.id} key={client.id}>
                    {client.name}
                  </MenuItem>
                ))}
              </Field>
            ) : (
              <div>
                <LinearProgress color="secondary" />
                Loading Client
              </div>
            )}
            <div>
              {this.props.roles ? (
                <Field name="roleId" label="Role" component={Select}>
                  {this.props.roles.map(role => (
                    <MenuItem value={role.id} key={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Roles
                </div>
              )}
            </div>
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
          </div>
          <div className="formAlignRight">
            <Button
              className="buttonFormat"
              variant="raised"
              color="primary"
              type="submit"
            >
              Create User
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

UserCreate.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  clients: PropTypes.array,
  roles: PropTypes.array,
};

const mapStateToProps = state => ({
  clients: state.ClientReducer.clients,
  roles: state.UserReducer.roles,
});

const withForm = reduxForm(
  {
    form: 'userCreate',
    validate,
  },
  UserCreate,
);

export default compose(connect(mapStateToProps), withForm)(UserCreate);
