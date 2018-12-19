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
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};
const required = value => (value ? undefined : 'Required');

/* eslint-disable react/prefer-stateless-function */
class SubscribeAllCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(ClientActions.getAll());
  }

  componentWillMount() {
    if (this.props.user.role.name !== 'Admin') {
      // eslint-disable-next-line react/prop-types
      this.props.initialize({ clientID: this.props.user.clientId });
    }
  }

  submit = (values) => {
    const client = Object.assign({}, values);
    this.props.dispatch(ClientActions.subscribeAll(client.clientID));
  };

  render() {
    return (
      <Card width="600px" title="Subscribe To All Courses">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.clients_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Clients
                </div>
              ) : (
                <Field
                  name="clientID"
                  label="Client Name"
                  component={Select}
                  validate={[required]}
                >
                  {(Array.isArray(this.props.clients) ? this.props.clients : [])
                  .filter(client => this.props.user.role.name === 'Admin' || client.id === this.props.user.clientId)
                  .map(client => (
                    <MenuItem value={client.id} key={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Field>
              )}
            </div>
          </div>
          {this.props.client_subscribing ? (
            <div style={{ width: '400px' }}>
              <LinearProgress color="secondary" />
              Subscribing Client To All Courses
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Subscribe To All Courses
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

SubscribeAllCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  clients: PropTypes.array,
  clients_loading: PropTypes.bool,
  client_subscribing: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  clients: state.ClientReducer.clients,
  clients_loading: state.ClientReducer.loading,
  client_subscribing: state.ClientReducer.subscribing,
  user: state.LoginReducer.user,
});

const withForm = reduxForm(
  {
    form: 'subscribeAllCreate',
    validate,
  },
  SubscribeAllCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(SubscribeAllCreate);
