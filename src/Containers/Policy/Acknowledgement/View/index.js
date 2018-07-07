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
import { StyledDelete } from '../../../../Styles/Delete';
import { StyledEdit } from '../../../../Styles/Edit';
import IconButton from '../../../../Styles/IconButton';
import CustomModal from '../../../../Components/Modal/index';

class PolicyAcknowledgementView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
  }

  componentWillMount() {
    this.props.dispatch(PolicyActions.getOutstandingPoliciesForUser());
  }

  acknowledge = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  confirmDelete = obj => () => {
    this.props.dispatch(PolicyActions.acknowledge(obj.id));
    this.child.handleClose();
  };

  viewPolicy = () => {
    // load the material file

  };

  render() {
    const { policyAcknowledgements } = this.props;
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
        Header: 'View/Acknowledge',
        accessor: 'view/acknowledge',
        Filter: <div />,
        Cell: row => (
          <div>
            <Tooltip id="tooltip-delete" title="View">
              <IconButton
                aria-label="Acknowledge"
                onClick={() => this.viewPolicy(row.original)}
              >
                <StyledEdit />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-delete" title="Acknowledge">
              <IconButton
                aria-label="Acknowledge"
                onClick={() => this.acknowledge(row.original)}
              >
                <StyledDelete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Card width="800px" title="Policy Acknowledgements">
          <div>
            {Array.isArray(policyAcknowledgements) && (
              <ReactTable
                columns={columns}
                data={policyAcknowledgements}
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
          onClick={this.acknowledge(this.state.obj)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policyAcknowledgements: state.PolicyReducer.policyAcknowledgements,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withForm = reduxForm(
  {
    form: 'policyAcknowledgementView',
  },
  PolicyAcknowledgementView,
);

PolicyAcknowledgementView.propTypes = {
  policyAcknowledgements: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(PolicyAcknowledgementView);
