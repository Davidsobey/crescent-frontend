/**
 *
 * CourseView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';

import Card from '../../../Components/Card';
import ModuleActions from '../../../Actions/ModuleActions';
import { StyledDelete } from '../../../Styles/Delete';
import { StyledEdit } from '../../../Styles/Edit';
import IconButton from '../../../Styles/IconButton';
import CustomModal from '../../../Components/Modal/index';
import TestActions from '../../../Actions/TestActions';
import history from '../../../Helpers/History';

class TestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
  }

  componentWillMount() {
    this.props.dispatch(ModuleActions.getAll());
    this.props.dispatch(TestActions.getAll());
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  confirmDelete = obj => () => {
    this.props.dispatch(TestActions.deleteTest(obj.id));
    this.child.handleClose();
  };

  handleEdit = (obj) => {
    this.props.dispatch(TestActions.loadTest(obj.id));
    history.push('/test/edit');
  };

  loadData = (children, parent) => {
    const formattedArray = [];
    if (Array.isArray(children) && Array.isArray(parent)) {
      children.forEach((child) => {
        const moduleMatch = parent.filter(parentObj => parentObj.id === child.moduleID);
        const newTest = {
          id: child.id,
          name: child.name,
          totalMarks: child.totalMarks,
          moduleID: moduleMatch.length ? moduleMatch[0].name : '',
        };
        formattedArray.push(newTest);
      });
      formattedArray.sort((a, b) => a.id - b.id);
    }
    return formattedArray;
  };

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Total Marks',
        accessor: 'totalMarks',
      },
      {
        Header: 'Module',
        accessor: 'moduleID',
      },
      {
        Header: 'Edit/Delete',
        accessor: 'edit/delete',
        Filter: <div />,
        Cell: row => (
          <div>
            <Tooltip id="tooltip-delete" title="Edit">
              <IconButton
                aria-label="Edit"
                onClick={() => this.handleEdit(row.original)}
              >
                <StyledEdit />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-delete" title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={() => this.handleDelete(row.original)}
              >
                <StyledDelete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ];
    const { tests, modules } = this.props;
    const data = this.loadData(tests, modules);
    return (
      <div>
        <Card width="800px" title="Assessment List">
          {this.props.tests_loading || this.props.modules_loading ? (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <ReactTable
              columns={columns}
              data={data}
              filterable
              defaultPageSize={10}
              className="-striped -highlight"
            />
          )}
        </Card>
        <CustomModal
          obj={this.state && this.state.obj}
          /* eslint-disable no-return-assign */
          onRef={ref => (this.child = ref)}
          onClick={this.confirmDelete(this.state.obj)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tests: state.TestReducer.tests,
  tests_loading: state.TestReducer.loading,
  modules: state.ModuleReducer.modules,
  modules_loading: state.ModuleReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withForm = reduxForm(
  {
    form: 'testView',
  },
  TestView,
);

TestView.propTypes = {
  dispatch: PropTypes.func,
  tests: PropTypes.array,
  tests_loading: PropTypes.bool,
  modules: PropTypes.array,
  modules_loading: PropTypes.bool,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(TestView);
