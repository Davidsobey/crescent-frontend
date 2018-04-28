/**
 *
 * ClientView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import Table from '../../../Components/Table';
import ClientActions from '../../../Actions/ClientActions';

const header = ['ID', 'Name', 'Email'];

class ClientView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(ClientActions.getAll());
  }
  render() {
    const { clients } = this.props;
    return (
      <Card width="800px" title="Client List">
        {Array.isArray(clients) ? (
          <Table header={header} data={clients} />
              ) : (
                <div className="center">
                  <CircularProgress color="secondary" />
                </div>
              )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.ClientReducer.clients,
});

const withForm = reduxForm(
  {
    form: 'clientView',
  },
  ClientView,
);

ClientView.propTypes = {
  clients: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(ClientView);
