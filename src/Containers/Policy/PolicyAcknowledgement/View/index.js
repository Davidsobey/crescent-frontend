
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../../Components/Card';
import Table from '../../../../Components/Table';
import PolicyActions from '../../../../Actions/PolicyActions';

const header = ['UserID', 'PolicyID'];

class AcknowledgementsView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(PolicyActions.getAll());
  }

  render() {
    const { acknowledgements } = this.props;
    return (
      <Card width="800px" title="Acknowledgements List">
        {Array.isArray(acknowledgements) ? (
          <Table header={header} data={acknowledgements} />
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
  acknowledgements: state.PoliciesReducer.acknowledgements,
});

const withForm = reduxForm(
  {
    form: 'acknowledgementsView',
  },
  AcknowledgementsView,
);

AcknowledgementsView.propTypes = {
  acknowledgements: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(AcknowledgementsView);
