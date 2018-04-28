import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider } from 'material-ui';
import { BrowserRouter as Prompt } from 'react-router-dom';

import Card from '../../../Components/Card';
import Button from '../../../Components/Button';
import TestActions from '../../../Actions/TestActions';
import history from '../../../Helpers/History';

class UserTest extends React.Component {
  componentWillUnmount() {
    if (this.props.history.action === 'POP') {
      history.push('/modules/test');
    }
    return true;
  }

  postQuestion(questionId, value) {
    if (value) {
      const val = parseInt(value, 10);
      this.props.dispatch(TestActions.markQuestion(questionId, val));
    }
  }

  loadQuestion(question) {
    this.props.dispatch(TestActions.loadTestQuestion(question));
    history.push('/modules/test/question');
  }

  submitTest(testId, courseId) {
    this.props.dispatch(TestActions.submitTest(testId, courseId, 2));
    history.push('/modules/test/complete');
  }

  render() {
    const { questions, test } = this.props;

    let count = 0;
    return (
      <div className="content">
        <Prompt message="Are you sure you want to go to back?" />
        {test &&
          questions && (
            <Card width="95%" title={`${test.name} Overview`}>
              <div className="test-table">
                {questions.map((question) => {
                  count += 1;
                  return (
                    <Button
                      key={count}
                      variant="raised"
                      className={
                        question.answerGivenId
                          ? 'button-completed'
                          : 'button-not-completed'
                      }
                      onClick={() => this.loadQuestion(question)}
                    >
                      {count}
                    </Button>
                  );
                })}
              </div>
              <br />
              <Divider />
              <br />
              <div className="alignRight">
                <Button
                  color="secondary"
                  variant="raised"
                  onClick={() => this.submitTest(test.id, this.props.courseId)}
                >
                  Complete Test
                </Button>
              </div>
            </Card>
          )}
      </div>
    );
  }
}

UserTest.propTypes = {
  questions: PropTypes.array,
  test: PropTypes.object,
  dispatch: PropTypes.func,
  courseId: PropTypes.number,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  test: state.TestReducer.test,
  questions: state.TestReducer.questions,
  courseId: state.CourseReducer.course.id,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTest);
