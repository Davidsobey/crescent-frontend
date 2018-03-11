import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Typography from 'material-ui/Typography';
import MobileStepper from 'material-ui/MobileStepper';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import Card from '../../../Components/Card';
import Button from '../../../Components/Button';
// import TestActions from '../../../Actions/TestActions';

class UserTest extends React.Component {
  state = {
    activeStep: 0,
    value: undefined,
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    let { test, questions } = this.props;
    const { activeStep } = this.state;

    if (!test) {
      test = {
        id: 4,
        name: 'Example Test',
        moduleID: 2,
        totalMarks: 100,
        module: null,
        questions: null,
        questionIds: null,
        enrolments: null,
      };
    }

    if (!questions) {
      questions = [
        {
          id: 2,
          testId: 4,
          courseId: 2,
          userId: 2,
          score: 0,
          questionId: 2,
          marked: true,
          answerGivenId: 2,
          question: {
            title: 'Is this another sample?',
            allocatedMarks: 10,
            testId: 4,
            test: null,
            questionOptions: [
              {
                title: 'No it is not',
                isAnswer: false,
                questionId: 2,
                id: 3,
              },
              {
                title: 'Yes it is',
                isAnswer: true,
                questionId: 2,
                id: 4,
              },
            ],
            id: 2,
          },
          enrolmentTest: null,
          answerGiven: null,
        },
        {
          id: 1,
          testId: 4,
          courseId: 2,
          userId: 2,
          score: 10,
          questionId: 1,
          marked: true,
          answerGivenId: 1,
          question: {
            title: 'This is a sample?',
            allocatedMarks: 10,
            testId: 4,
            test: null,
            questionOptions: [
              {
                title: 'Yes it is',
                isAnswer: true,
                questionId: 1,
                id: 1,
              },
              {
                title: 'No it is not',
                isAnswer: false,
                questionId: 1,
                id: 2,
              },
            ],
            id: 1,
          },
          enrolmentTest: null,
          answerGiven: {
            title: 'Yes it is',
            isAnswer: true,
            questionId: 1,
            question: {
              title: 'This is a sample?',
              allocatedMarks: 10,
              testId: 4,
              test: null,
              questionOptions: [
                {
                  title: 'No it is not',
                  isAnswer: false,
                  questionId: 1,
                  id: 2,
                },
              ],
              id: 1,
            },
            id: 1,
          },
        },
      ];
    }

    const noOfQuestions = questions.length;

    return (
      <div className="content">
        {test && (
          <Card width="800px" title={test.name}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                {questions[activeStep].question.title}
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {questions[activeStep].question.questionOptions.map(option => (
                  <FormControlLabel
                    value={option.title}
                    control={<Radio />}
                    label={option.title}
                    key={option.id}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <MobileStepper
              variant="progress"
              steps={noOfQuestions}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={this.handleNext}
                  disabled={this.state.activeStep === 5}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={this.handleBack}
                  disabled={this.state.activeStep === 0}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Card>
        )}
      </div>
    );
  }
}

UserTest.propTypes = {
  questions: PropTypes.array,
  test: PropTypes.object,
};

const mapStateToProps = state => ({
  test: state.TestReducer.test,
  questions: state.TestReducer.questions,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTest);
