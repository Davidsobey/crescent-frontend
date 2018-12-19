import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import TextField from '../../../Components/TextField';
import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import UserActions from '../../../Actions/UserActions';
import LinearProgress from '../../../Components/LinearProgress';

let validated = false;
const validate = () => {
  const errors = {};
  return errors;
};
const required = value => (value ? undefined : 'Required');
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

class EnrolAllCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(UserActions.getAll());
    this.state = {
      value: this.props.value,
      data: '',
      userId: undefined,
    };
  }

  submit = (values) => {
    if (this.state.selectedDate ? (new Date(this.state.selectedDate)) < (new Date()) : true) { return; }
    const userDate = Object.assign({}, values);
    this.props.dispatch(UserActions.enrolAll(userDate));
  };

  handleSubmitClicked = () => {
    validated = true;
  }

  handleDateChange = (values) => {
    this.setState({ selectedDate: values.target.value });
  };

  render() {
    const { selectedDate } = this.state;
    const val = this.state.value || null;

    return (
      <Card width="600px" title="Enrol A User In All Courses">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.users_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Users
                </div>
              ) : (
                <div>
                  <Field
                    name="user"
                    label="User"
                    component={Select}
                    validate={[required]}
                  >
                    {(Array.isArray(this.props.users) ? this.props.users : [])
                    .filter(user => (this.props.user.role.name === 'Admin' || this.props.user.clientId === user.clientId))
                    .map(user => (
                      <MenuItem value={user.id} key={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              )}
              <div>
                <TextField
                  name="deadline"
                  label="Deadline"
                  onChange={this.handleDateChange}
                  margin="normal"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={validated && (selectedDate ? (new Date(selectedDate)) < (new Date()) : true)}
                />
                {validated ? (
                  <Typography variant="caption" component="p" style={{ color: '#f00' }}>
                    { selectedDate ? (new Date(selectedDate)) < (new Date()) ? 'Must be a future day' : undefined : 'Required' }
                  </Typography>
                ) : ''}
              </div>
            </div>
          </div>
          {this.props.user_enrolling ? (
            <div style={{ width: '400px' }}>
              <LinearProgress color="secondary" />
              Enrolling User
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                onClick={this.handleSubmitClicked}
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Enrol User In All Courses
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

EnrolAllCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  users: PropTypes.array,
  users_loading: PropTypes.bool,
  user: PropTypes.object,
  user_enrolling: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    users: state.UserReducer.users,
    users_loading: state.UserReducer.loading,
    user: state.LoginReducer.user,
    user_enrolling: state.UserReducer.enrolling,
  };
}

const withForm = reduxForm(
  {
    form: 'enrolAllCreate',
    validate,
  },
  EnrolAllCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(EnrolAllCreate);
