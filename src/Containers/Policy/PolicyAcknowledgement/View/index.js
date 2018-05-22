import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
// import { CircularProgress } from 'material-ui/Progress';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';

import Card from '../../../../Components/Card';
import PolicyActions from '../../../../Actions/PolicyActions';
import { StyledEdit } from '../../../../Styles/Edit';
import IconButton from '../../../../Styles/IconButton';
import CustomModal from '../../../../Components/Modal/index';

class AcknowledgementsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
  }

  componentWillMount() {
    this.props.dispatch(PolicyActions
      .getUserOutstandingPolicies(this.props.userId));
  }

  handleAcknowledgement = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  confirmAcknowledgement = obj => () => {
    const acknowledgement = true; // you can't refuse to acknowledge
    this.props.dispatch(PolicyActions.acknowledgePolicy(acknowledgement, this.props.userId, obj.policyId));
    this.child.handleClose();
  };

  render() {
    const { acknowledgements } = this.props.acknowledgements;
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Acknowledge',
        accessor: 'acknowledge',
        Cell: row => (
          <div>
            <Tooltip id="tooltip-edit" title="Acknowledge">
              <IconButton
                aria-label="Edit"
                onClick={() => this.handleAcknowledgement(row.original)}
              >
                <StyledEdit />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Card width="800px" title="Acknowledgements List">
          <div>
            {Array.isArray(acknowledgements) && (
              <ReactTable
                columns={columns}
                data={acknowledgements}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
              />
            )}
          </div>
        </Card>
        <CustomModal
          obj={this.state && this.state.obj}
          /* eslint-disable no-return-assign */
          onRef={ref => (this.child = ref)}
          onClick={this.confirmAcknowledgement(this.state.obj)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  acknowledgements: state.PolicyReducer.policies,
  userId: state.UserReducer.user.Id,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withForm = reduxForm(
  {
    form: 'acknowledgementsView',
  },
  AcknowledgementsView,
);

AcknowledgementsView.propTypes = {
  acknowledgements: PropTypes.array,
  userId: PropTypes.number,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(AcknowledgementsView);
