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

const header = ['ID', 'Name', 'Description', 'Category'];

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(TestActions.getAll());
    this.props.dispatch(QuestionActions.getAll());
  }

  loadData = (Questions, Tests) => {
    const formattedArray = [];
    if (Array.isArray(Questions)) {
      Questions.forEach((Question) => {
        const TestMatch = Tests.filter(Test => Test.id === Question.TestId);
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

  render() {
    const { Tests, Questions } = this.props;
    const data = this.loadData(Questions, Tests);
    return (
      <Card width="800px" title="Question List">
        {Array.isArray(Questions) && Array.isArray(Tests) ? (
          <Table header={header} data={data} />
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
  Tests: state.TestReducer.Tests,
  Questions: state.QuestionReducer.Questions,
});

const withForm = reduxForm(
  {
    form: 'QuestionView',
  },
  QuestionView,
);

QuestionView.propTypes = {
  Tests: PropTypes.array,
  dispatch: PropTypes.func,
  Questions: PropTypes.array,
};

export default compose(connect(mapStateToProps), withForm)(QuestionView);
