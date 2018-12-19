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
  constructor(props) {
    super(props);
    this.state = {
      showError : false,
    };
  }

  /* componentDidMount() {
    this.props.dispatch(TestActions.loadTestQuestions(this.props.user.id, this.props.test.id));
  } */
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

  submitTest(testId, courseId, userId) {
    let notAnswered = this.props.questions.filter(q => !q.answerGivenId).length;
    if (notAnswered)
      this.setState({showError: true});
    else {
      this.props.dispatch(TestActions.submitTest(testId, courseId, userId));
      history.push('/home');
    }
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
              <h4>Click the questions below to view and answer them. </h4>
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
                      Question {count}
                    </Button>
                  );
                })}
              </div>
              <br />
              <Divider />
              <br />
              <div style={{ color: '#f00' }}>
                {this.state.showError ? "In order to complete test, you have to answer all questions" : ""}
              </div>
              <div className="alignRight">
                <Button
                  color="secondary"
                  variant="raised"
                  onClick={() =>
                    this.submitTest(
                      test.id,
                      this.props.courseId,
                      this.props.user.id,
                    )
                  }
                >
                  Complete Assessment
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
  user: PropTypes.object,
  dispatch: PropTypes.func,
  courseId: PropTypes.number,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  test: state.TestReducer.test,
  questions: state.TestReducer.questions,
  courseId: state.CourseReducer.course.id,
  user: state.LoginReducer.user,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTest);
