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
import QuestionActions from '../../../Actions/QuestionActions';
import OptionActions from '../../../Actions/OptionActions';
import { StyledDelete } from '../../../Styles/Delete';
import { StyledEdit } from '../../../Styles/Edit';
import IconButton from '../../../Styles/IconButton';
import CustomModal from '../../../Components/Modal/index';
import history from '../../../Helpers/History';

class OptionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
    this.props.dispatch(QuestionActions.getAll());
    this.props.dispatch(OptionActions.getAll());
  }

  handleDelete = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  confirmDelete = obj => () => {
    this.props.dispatch(OptionActions.deleteOption(obj.id));
    this.child.handleClose();
  };

  handleEdit = (editObj) => {
    this.props.dispatch(OptionActions.loadOption(editObj.id));
    history.push('/option/edit');
  };

  loadData = (options, questions) => {
    const formattedArray = [];
    if (Array.isArray(options) && Array.isArray(questions)) {
      options.forEach((option) => {
        const questionMatch = questions.filter(question => question.id === option.questionId);
        const newOption = {
          id: option.id,
          title: option.title,
          isAnswer: option.isAnswer,
          question: questionMatch[0].name,
        };
        formattedArray.push(newOption);
      });
      formattedArray.sort((a, b) => a.id - b.id);
    }
    return formattedArray;
  };

  render() {
    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Is Answer',
        accessor: 'isAnswer',
      },
      {
        Header: 'Question',
        accessor: 'question',
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
    const { questions, options } = this.props;
    const data = this.loadData(options, questions);
    return (
      <div>
        <Card width="800px" title="Option List">
          {Array.isArray(options) && Array.isArray(questions) ? (
            <ReactTable
              columns={columns}
              data={data}
              filterable
              defaultPageSize={10}
              className="-striped -highlight"
            />
          ) : (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
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
  questions: state.QuestionReducer.questions,
  options: state.OptionReducer.options,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withForm = reduxForm(
  {
    form: 'optionView',
  },
  OptionView,
);

OptionView.propTypes = {
  questions: PropTypes.array,
  dispatch: PropTypes.func,
  options: PropTypes.array,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(OptionView);
