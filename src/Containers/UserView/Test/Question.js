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
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    if (!this.props.questions) {
      this.props.dispatch(TestActions.loadQuestions(''));
    }
    if (!this.props.question) {
      this.props.dispatch(TestActions.loadQuestion1(''));
    }
  }

  handleNext = (questionId) => {
    if (this.state.value) {
      this.postQuestion(questionId, this.state.value);
    }
    this.loadQuestion(questionId, 1);
  };

  handleBack = (questionId) => {
    if (this.state.value) {
      this.postQuestion(questionId, this.state.value);
    }
    this.loadQuestion(questionId, -1);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  postQuestion(questionId, value) {
    if (value) {
      const val = parseInt(value, 10);
      this.props.dispatch(TestActions.markQuestion(questionId, val));
    }
  }

  loadQuestion(question, direction) {
    this.props.dispatch(TestActions.loadNextTestQuestion(question.id, direction));
  }

  render() {
    let { test } = this.props;
    const { question } = this.props;

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
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      {question.question.questionOptions.map(option => (
                        <FormControlLabel
                          value={option.id.toString()}
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
                    onClick={() => history.push('/modules/test')}
                  >
                    Return to Overview
                  </Button>
                </div>
              </div>
              <br />
              <div className="justify-content flex-container">
                <Button size="small" onClick={this.handleBack}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    this.handleNext(question.questionId);
                  }}
                >
                  Next
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

export default connect(mapStateToProps, mapDispatchToProps)(UserTestQuestion);
