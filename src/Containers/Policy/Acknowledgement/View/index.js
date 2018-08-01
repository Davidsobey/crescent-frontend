import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
// import { CircularProgress } from 'material-ui/Progress';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';
import { CircularProgress } from 'material-ui/Progress';

import history from '../../../../Helpers/History';
import Card from '../../../../Components/Card';
import PolicyActions from '../../../../Actions/PolicyActions';
import UserActions from '../../../../Actions/UserActions';
import { StyledDelete } from '../../../../Styles/Delete';
import { StyledEdit } from '../../../../Styles/Edit';
import IconButton from '../../../../Styles/IconButton';
import CustomModal from '../../../../Components/Modal/index';
import Button from '../../../../Components/Button/index';

class PolicyAcknowledgementView extends React.Component {
  constructor(props) {
    super(props);
   // this.state = { obj: {} };
  }

  componentWillMount() {
    this.props.dispatch(UserActions.getAll());
    this.props.dispatch(PolicyActions.getOutstandingPoliciesForClient(this.props.user.clientId));
  }

  loadPolicy = (id, name, description) => {
    this.props.dispatch(PolicyActions.getMaterialsForPolicy(id, name, description));
  };

  manipulateData = (policyAcknowledgements) => {
    var getUserNameById = userId => {
      if (this.props.users) {
        let user = this.props.users.filter(user => user.id == userId);
        return user.length > 0 ? user[0].name : '';
      }
      return '';
    };
    const data = [];
    policyAcknowledgements
    .filter(policyAcknowledgement => policyAcknowledgement.policyMaterialLink)
    .forEach((policyAcknowledgement) => {
      const newPolicyAcknowledgement = {
        policyId: policyAcknowledgement.policyID,
        userId: policyAcknowledgement.userID,
        userName: getUserNameById(policyAcknowledgement.userID),
        policyName: policyAcknowledgement.policyName,
        description: policyAcknowledgement.policyDescription,
        acknowledged: policyAcknowledgement.acknowledged?'Yes':'No',
      };
      data.push(newPolicyAcknowledgement);
    });
    console.log(data);
    return data;
  };

  render() {
    const { policyAcknowledgements, user } = this.props;
    const columns = [
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'Policy Name',
        accessor: 'policyName',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Acknowledged',
        accessor: 'acknowledged',
      },
      { 
        Header: 'View Policy Details',
        accessor: 'view/acknowledge',
        Filter: <div />,
        Cell: row => (row.original.userId == user.id&&row.original.acknowledged=='No' ?
          <div>
            <Button
              className="small-font"
              color="primary"
              onClick={() => this.loadPolicy(row.original.policyId, row.original.policyName, row.original.description)}
            >
              View Policy Details
            </Button>
          </div> : <div></div>
        ),
      },
    ];
    return (
      <div>
        <Card width="800px" title="Policy Acknowledgements">
          {this.props.policyAcknowledgements_loading || this.props.users_loading ? (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              <ReactTable
                columns={columns}
                data={this.manipulateData(policyAcknowledgements)}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policyAcknowledgements: state.PolicyReducer.policyAcknowledgements,
  policyAcknowledgements_loading: state.PolicyReducer.loading,
  user: state.LoginReducer.user,
  users: state.UserReducer.users,
  users_loading: state.UserReducer.loading,
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
  user: PropTypes.object,
  users: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(PolicyAcknowledgementView);
