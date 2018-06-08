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
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';

import history from '../../../Helpers/History';
import Card from '../../../Components/Card';
import TestActions from '../../../Actions/TestActions';
import QuestionActions from '../../../Actions/QuestionActions';

import { StyledDelete } from '../../../Styles/Delete';
import { StyledEdit } from '../../../Styles/Edit';
import IconButton from '../../../Styles/IconButton';
import CustomModal from '../../../Components/Modal/index';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
    this.props.dispatch(TestActions.getAll());
    this.props.dispatch(QuestionActions.getAll());
  }

  handleDelete = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  confirmDelete = obj => () => {
    this.props.dispatch(QuestionActions.deleteQuestion(obj.id));
    this.child.handleClose();
  };

  loadData = (Tests, Questions) => {
    const formattedArray = [];
    if (Array.isArray(Questions)) {
      Questions.forEach((Question) => {
        const TestMatch = Tests.filter(Test => Test.id === Question.testId);
        const newQuestion = {
          id: Question.id,
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

  handleDelete = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  confirmDelete = obj => () => {
    this.props.dispatch(QuestionActions.deleteQuestion(obj.id));
    this.child.handleClose();
  };

  handleEdit = (editObj) => {
    this.props.dispatch(QuestionActions.getByID(editObj.id));
    history.push('/question/edit');
  };

  render() {
    const { tests, questions } = this.props;
    let data;
    if (tests && questions) {
      data = this.loadData(tests, questions);
    }
    const columns = [
      {
        Header: 'Question Name',
        accessor: 'title',
      },
      {
        Header: 'Allocated Marks',
        accessor: 'allocatedMarks',
      },
      {
        Header: 'Assessment',
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
            {Array.isArray(data) && (
              <ReactTable
                columns={columns}
                data={data}
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
          onClick={this.confirmDelete(this.state.obj)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tests: state.TestReducer.tests,
  questions: state.QuestionReducer.questions,
});

const withForm = reduxForm(
  {
    form: 'QuestionView',
  },
  QuestionView,
);

QuestionView.propTypes = {
  tests: PropTypes.array,
  dispatch: PropTypes.func,
  questions: PropTypes.array,
};

export default compose(connect(mapStateToProps), withForm)(QuestionView);
