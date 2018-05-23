import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import Table from '../../../Components/Table';
import PolicyActions from '../../../Actions/PolicyActions';

const header = ['ID', 'Name', 'Description'];

class PolicyView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(PolicyActions.getAll());
  }

  render() {
    const { policies } = this.props;
    return (
      <Card width="800px" title="Policies List">
        {Array.isArray(policies) ? (
          <Table header={header} data={policies} />
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
  policies: state.PoliciesReducer.policies,
});

const withForm = reduxForm(
  {
    form: 'policyView',
  },
  PolicyView,
);

PolicyView.propTypes = {
  policies: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(PolicyView);
