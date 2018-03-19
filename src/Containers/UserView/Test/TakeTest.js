import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Typography from 'material-ui/Typography';
// import MobileStepper from 'material-ui/MobileStepper';
// import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
// import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
// import Radio, { RadioGroup } from 'material-ui/Radio';
// import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import { Divider } from 'material-ui';

import Card from '../../../Components/Card';
import Button from '../../../Components/Button';
import TestActions from '../../../Actions/TestActions';
import history from '../../../Helpers/History';

class UserTest extends React.Component {
  componentDidMount() {
    if (!this.props.questions) {
      this.props.dispatch(TestActions.loadQuestions(''));
    }
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

  render() {
    let { test } = this.props;
    const { questions } = this.props;

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

    let count = 0;
    return (
      <div className="content">
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
                <Button color="secondary" variant="raised">
                  Complete Test
                </Button>
              </div>

              {/* <FormControl component="fieldset">
                <FormLabel component="legend">
                  {questions[activeStep].question.title}
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={
                    (this.state.value > 0 &&
                      this.state.value[activeStep] &&
                      this.state.value[activeStep].toString()) ||
                    questions[activeStep].answerGivenId.toString()
                  }
                  onChange={this.handleChange}
                >
                  {questions[activeStep].question.questionOptions.map(option => (
                    <FormControlLabel
                      value={option.id.toString()}
                      control={<Radio />}
                      label={option.title}
                      key={option.id}
                    />
                    ))}
                </RadioGroup>
              </FormControl> */}

              {/* <MobileStepper
                variant="progress"
                steps={questions.length}
                position="static"
                activeStep={this.state.activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={() => {
                      this.handleNext(questions[activeStep].questionId);
                    }}
                    disabled={this.state.activeStep === questions.length - 1}
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
              <br />
              {this.state.activeStep === questions.length - 1 && (
                <div className="row alignRight">
                  <Button color="secondary" variant="raised">
                    Complete Test
                  </Button>
                </div>
              )} */}
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
};

const mapStateToProps = state => ({
  test: state.TestReducer.test,
  questions: state.TestReducer.questions,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTest);
