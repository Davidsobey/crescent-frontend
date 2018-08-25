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
let users = [];
const required = value => (value ? undefined : 'Required');
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);
const userExists = value => (value && Array.isArray(users) ? users.filter(user => user.email === value).length ? 'User with that email already exists' : undefined : undefined);


class UserCreate extends React.Component {
  componentWillMount() {
    if (this.props.user.role.name == 'Admin') {
      if (this.props.newClientId)
        {this.props.initialize({ clientId: this.props.newClientId, roleId: this.props.clientRoleId });}
    } else {
      this.props.initialize({ clientId: this.props.user.clientId });
    }
  }

  componentDidMount() {
    this.props.dispatch(ClientActions.getAll());
    this.props.dispatch(UserActions.getAllRoles());
    this.props.dispatch(UserActions.getAll());
  }

  submit = (values) => {
    const user = Object.assign({}, values);
    this.props.dispatch(UserActions.register(user));
  };

  render() {
    users = this.props.users;
    const { user } = this.props;
    return (
      <Card width="600px" title="Create New User">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          autoComplete="off"
          className="centerForm"
        >
          <div>
            {!this.props.clients_loading ? (
              <Field
                name="clientId"
                label="Client Name"
                component={Select}
                validate={[required]}
              >
                {(Array.isArray(this.props.clients) ? this.props.clients : [])
                .filter(client => this.props.user.role.name == 'Admin' || client.id == this.props.user.clientId)
                .map(client => (
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
              {!this.props.roles_loading ? (
                <Field name="roleId" label="Role" component={Select} validate={[required]}>
                  {(Array.isArray(this.props.roles) ? this.props.roles : [])
                  .filter(role => (!(role.name == 'Admin' && user.role.name == 'Client')))
                  .map(role => (
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
                validate={[required, email, userExists]}
              />
            </div>
            <div>
              <Field
                name="name"
                label="Full Name"
                margin="normal"
                component={TextField}
                validate={[required]}
              />
            </div>
          </div>
          {this.props.user_creating ? (
            <div style={{ width: '400px' }}>
              <LinearProgress color="secondary" />
              Creating User
            </div>
          ) : (
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
          )}
        </form>
      </Card>
    );
  }
}

UserCreate.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  user: PropTypes.object,
  users: PropTypes.array,
  users_loading: PropTypes.bool,
  newClientId: PropTypes.number,
  clientRoleId: PropTypes.number,
  clients: PropTypes.array,
  clients_loading: PropTypes.bool,
  roles: PropTypes.array,
  roles_loading: PropTypes.bool,
  user_creating: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  users: state.UserReducer.users,
  users_loading: state.UserReducer.loading,
  newClientId: state.ClientReducer.newClientId,
  clientRoleId: state.ClientReducer.clientRoleId,
  clients: state.ClientReducer.clients,
  clients_loading: state.ClientReducer.loading,
  roles: state.UserReducer.roles,
  roles_loading: state.UserReducer.loading,
  user_creating: state.UserReducer.creating,
});

const withForm = reduxForm(
  {
    form: 'userCreate',
    validate,
  },
  UserCreate,
);

export default compose(connect(mapStateToProps), withForm)(UserCreate);
