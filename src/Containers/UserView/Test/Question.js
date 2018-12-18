import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import Card from '../../../Components/Card';
import Button from '../../../Components/Button';
import TestActions from '../../../Actions/TestActions';
import history from '../../../Helpers/History';

class UserTestQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.loadQuestion = this.loadQuestion.bind(this);
  }

  handleNext = (question, answerGivenId) => {
    if (answerGivenId) {
      this.postQuestion(question.id, answerGivenId);
    }
    this.loadQuestion(question.questionId, 1);
  };

  handleBack = (questionId, answerGivenId) => {
    if (answerGivenId) {
      this.postQuestion(questionId, answerGivenId);
    }
    this.loadQuestion(questionId, -1);
  };

  handleRedirect = (question, answerGivenId) => {
    if (answerGivenId) {
      this.postQuestion(question.id, answerGivenId);
    }
    history.push('/modules/test');
  };

  handleChange = (event, value) => {
    const val = parseInt(value, 10);
    this.props.dispatch(TestActions.changeAnswer(val));
  };

  postQuestion(questionId, value) {
    if (value) {
      const val = parseInt(value, 10);
      this.props.dispatch(TestActions.markQuestion(questionId, val));
    }
  }

  loadQuestion(question, direction) {
    this.props.dispatch(TestActions.loadNextQuestion(this.questionInTest(question, direction)));
  }

  findIndex(question) {
    return this.props.questions.findIndex(x => x.questionId === question);
  }

  questionInTest(question, direction) {
    let index = this.findIndex(question);

    if (direction === -1) {
      if (index !== 0) index -= 1;
    } else if (direction === 1 && this.props.questions.length !== index + 1) {
      index += 1;
    }

    return this.props.questions[index];
  }
  render() {
    const { question, questions, test } = this.props;

    return (
      <div className="content">
        {test &&
          question && (
            <Card width="800px" title={test.name}>
              <div className="justify-content flex-container">
                <div>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      {question.question.title}
                    </FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={
                        this.props.question.answerGivenId &&
                        this.props.question.answerGivenId.toString()
                      }
                      onChange={this.handleChange}
                    >
                      {question.question.questionOptions.map(option => (
                        <FormControlLabel
                          value={`${option.id}`}
                          control={<Radio />}
                          label={option.title}
                          key={option.id}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={() =>
                      this.handleRedirect(
                        question,
                        question.answerGivenId,
                      )
                    }
                  >
                    Return to Overview
                  </Button>
                </div>
              </div>
              <br />
              <div className="justify-content flex-container">
                <Button
                  size="small"
                  onClick={() => {
                    this.handleBack(
                      question.questionId,
                      question.answerGivenId,
                    );
                  }}
                  disabled={this.findIndex(question.questionId) === 0}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    if (this.findIndex(question.questionId) !== questions.length - 1)
                      this.handleNext(question, question.answerGivenId);
                    else
                      this.handleRedirect(question, question.answerGivenId);
                  }}
                >
                  {questions &&
                  this.findIndex(question.questionId) !== questions.length - 1
                    ? 'Next'
                    : 'Finalize'}
                  <KeyboardArrowRight />
                </Button>
              </div>
            </Card>
          )}
      </div>
    );
  }
}

UserTestQuestion.propTypes = {
  question: PropTypes.object,
  test: PropTypes.object,
  dispatch: PropTypes.func,
  questions: PropTypes.array,
};

const mapStateToProps = state => ({
  test: state.TestReducer.test,
  question: state.TestReducer.question,
  questions: state.TestReducer.questions,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTestQuestion);
