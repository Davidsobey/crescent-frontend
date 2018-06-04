/**
 *
 * UserEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';

import Select from '../../../Components/Select';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import UserActions from '../../../Actions/UserActions';
import LinearProgress from '../../../Components/LinearProgress';
import ClientActions from '../../../Actions/ClientActions';

/* eslint-disable react/prefer-stateless-function */
class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(UserActions.getAllRoles());
    this.props.dispatch(ClientActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(UserActions.editUser(values));
  };

  render() {
    return (
      <Card width="600px" title="Edit User">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
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
                  Loading Clients
                </div>
              )}
            </div>

            <div>
              {this.props.roles ? (
                <Field name="roleId" label="Role Name" component={Select}>
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
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Edit User
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

UserEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  clients: PropTypes.array,
  roles: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const UserEdited = reduxForm({
  form: 'userEdit', // a unique identifier for this form
})(UserEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.UserReducer.user, // pull initial values from reducer
    clients: state.ClientReducer.clients,
    roles: state.UserReducer.roles,
  }),
  mapDispatchToProps,
)(UserEdited);

export default FormState;
