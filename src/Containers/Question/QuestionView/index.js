/**
 *
 * QuestionView
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
import TestActions from '../../../Actions/TestActions';
import QuestionActions from '../../../Actions/QuestionActions';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
    this.props.dispatch(TestActions.getAll());
    this.props.dispatch(QuestionActions.getAll());
  }

  loadData = (Questions, Tests) => {
    const formattedArray = [];
    if (Array.isArray(Questions)) {
      Questions.forEach(Question => {
        const TestMatch = Tests.filter(Test => Test.id === Question.TestId);
        const newQuestion = {
          title: Question.title,
          allocatedMarks: Question.allocatedMarks,
          test: TestMatch[0].name,
        };
        formattedArray.push(newQuestion);
      });
      formattedArray.sort((a, b) => a.id - b.id);
    }
    return formattedArray;
  };

  render() {
    const { Tests, Questions } = this.props;
    const data = this.loadData(Questions, Tests);
    const columns = [
      {
        Header: 'Name',
        accessor: 'title',
      },
      {
        Header: 'Allocated Marks',
        accessor: 'allocatedMarks',
      },
      {
        Header: 'Test',
        accessor: 'test',
      },
      {
        Header: 'Edit/Delete',
        accessor: 'edit/delete',
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
    return (
      <div>
        <Card width="800px" title="Question List">
          <div>
            <ReactTable
              columns={data}
              data={this.loadData}
              filterable
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </div>
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
  Tests: state.TestReducer.Tests,
  Questions: state.QuestionReducer.Questions,
});

const withForm = reduxForm(
  {
    form: 'QuestionView',
  },
  QuestionView
);

QuestionView.propTypes = {
  Tests: PropTypes.array,
  dispatch: PropTypes.func,
  Questions: PropTypes.array,
};

export default compose(connect(mapStateToProps), withForm)(QuestionView);
