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
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

class UserCreate extends React.Component {
  componentDidMount() {
    this.props.dispatch(ClientActions.getAll());
    this.props.dispatch(UserActions.getAllRoles());
  }
  
  componentWillMount () {
    if (this.props.user.role.name != 'Admin') {
      this.props.initialize({ clientId: this.props.user.clientId });
    }
  }

  submit = (values) => {
    const user = Object.assign({}, values);
    this.props.dispatch(UserActions.register(user));
  };

  render() {
    let {user} = this.props;
    return (
      <Card width="600px" title="Create New User">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          autoComplete="off"
          className="centerForm"
        >
          <div>
            {this.props.clients ? (
              <Field 
                name="clientId" 
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
            ) : (
              <div>
                <LinearProgress color="secondary" />
                Loading Client
              </div>
            )}
            <div>
              {this.props.roles ? (
                <Field name="roleId" label="Role" component={Select} validate={[ required ]}>
                  {(Array.isArray(this.props.roles) ? this.props.roles : [])
                  .filter(role => (role.name == 'Admin' && user.role.name == 'Client' ? false : true) )
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
          {this.props.user_creating ? (
            <div style={{width: '400px'}}>
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
  clients: PropTypes.array,
  roles: PropTypes.array,
  user_creating: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  clients: state.ClientReducer.clients,
  roles: state.UserReducer.roles,
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
