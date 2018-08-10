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
import { CircularProgress } from 'material-ui/Progress';

import Select from '../../../Components/Select';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import UserActions from '../../../Actions/UserActions';
import LinearProgress from '../../../Components/LinearProgress';
import ClientActions from '../../../Actions/ClientActions';

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

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
        {this.props.user_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <form
            onSubmit={this.props.handleSubmit(this.submit)}
            autoComplete="off"
            className="centerForm"
          >
            <div>
              {!this.props.clients_loading ? (
                <div>
                  <Field 
                    name="clientId" 
                    label="Client Name" 
                    component={Select}
                    validate={[ required ]}
                  >
                    {(Array.isArray(this.props.clients) ? this.props.clients : [])
                    .map(client => (
                      <MenuItem value={client.id} key={client.id}>
                        {client.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Clients
                </div>
              )}
              {!this.props.roles_loading ? (
                <div>
                  <Field 
                    name="roleId" 
                    label="Role Name" 
                    component={Select}
                    validate={[ required ]}
                  >
                    {(Array.isArray(this.props.roles) ? this.props.roles : [])
                    .map(role => (
                      <MenuItem value={role.id} key={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Roles
                </div>
              )}
              <div>
                <Field
                  name="email"
                  label="Email"
                  margin="normal"
                  component={TextField}
                  validate={[ required, email ]}
                />
              </div>
              <div>
                <Field
                  name="name"
                  label="Name"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
            </div>
            {this.props.user_editing ? (
              <div style={{width: '400px'}}>
                <LinearProgress color="secondary" />
                Editing User
              </div>
            ) : (
              <div className="formAlignRight">
                <Button
                  className="buttonFormat"
                  variant="raised"
                  color="primary"
                  type="submit"
                >
                  Edit User
                </Button>
              </div>
            )}
          </form>
        )}
      </Card>
    );
  }
}

UserEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  clients: PropTypes.array,
  clients_loading: PropTypes.bool,
  roles: PropTypes.array,
  roles_loading: PropTypes.bool,
  user_loading: PropTypes.bool,
  user_editing: PropTypes.bool,
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
    clients_loading: state.ClientReducer.loading,
    roles: state.UserReducer.roles,
    roles_loading: state.UserReducer.loading,
    user_loading: state.UserReducer.user_loading,
    user_editing: state.UserReducer.user_editing,
  }),
  mapDispatchToProps,
)(UserEdited);

export default FormState;
