import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Checkbox from '../../../Components/Checkbox';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import QuestionActions from '../../../Actions/QuestionActions';
import LinearProgress from '../../../Components/LinearProgress';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';
import TestActions from '../../../Actions/TestActions';
import OptionActions from '../../../Actions/OptionActions';

const validate = () => {
  const errors = {};

  return errors;
};

class OptionCreate extends React.Component {
  componentDidMount() {
    this.props.dispatch(CourseActions.getAll());
  }

  loadModules = (values) => {
    this.props.dispatch(ModuleActions.loadModuleByCourse(values.target.value));
  };

  loadTests = (values) => {
    this.props.dispatch(TestActions.loadTestByModule(values.target.value));
  };

  loadQuestions = (values) => {
    this.props.dispatch(QuestionActions.loadQuestionsByTest(values.target.value));
  }

  submit = (values) => {
    this.props.dispatch(OptionActions.create(
      values.test,
      values.questionTitle,
      values.questionAllocatedMarks,
    ));
  };

  render() {
    return (
      <Card width="600px" title="Create New Question Option">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <div className="width200">
              {this.props.courses ? (
                <Field
                  name="course"
                  onChange={this.loadModules}
                  label="Course Name"
                  component={Select}
                >
                  {this.props.courses.map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses
                </div>
              )}
            </div>
            <div className="width200">
              {this.props.modules ? (
                <Field
                  name="module"
                  label="Module Name"
                  component={Select}
                  onChange={this.loadTests}
                >
                  {this.props.modules.map(module => (
                    <MenuItem value={module.id} key={module.id}>
                      {module.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <Typography variant="caption" component="p">
                    Choose a course to load related modules
                  </Typography>
                </div>
              )}
              {this.props.modulesLoading && (
                <div>
                  <LinearProgress color="secondary" />
                  Loading modules
                </div>
              )}
            </div>
            <div className="width200">
              {this.props.tests ? (
                <Field
                  name="test"
                  label="Test Name"
                  component={Select}
                  onChange={this.loadQuestions}
                >
                  {this.props.tests.map(test => (
                    <MenuItem value={test.id} key={test.id}>
                      {test.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <Typography variant="caption" component="p">
                    Choose a module to load related tests
                  </Typography>
                </div>
              )}
              {this.props.testsLoading && (
                <div>
                  <LinearProgress color="secondary" />
                  Loading tests
                </div>
              )}
            </div>
            {this.props.tests && (
              <div className="width200">
                {this.props.tests && this.props.questions ? (
                  <Field
                    name="test"
                    label="Test Name"
                    component={Select}
                  >
                    {this.props.questions.map(question => (
                      <MenuItem value={question.id} key={question.id}>
                        {question.name}
                      </MenuItem>
                    ))}
                  </Field>
                ) : (
                  <div>
                    <Typography variant="caption" component="p">
                      Choose a question for the new question option
                    </Typography>
                  </div>
                )}
                <div>
                  <Field
                    name="OptionTitle"
                    label="Question Option Title"
                    margin="normal"
                    component={TextField}
                  />
                </div>
                <div>
                  <Field
                    name="OptionIsAnswer"
                    label="Is This Option The Answer?"
                    margin="normal"
                    component={Checkbox}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Create Option
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

OptionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  questions: PropTypes.array,
  tests: PropTypes.array,
  courses: PropTypes.array,
  modules: PropTypes.array,
  modulesLoading: PropTypes.bool,
  testsLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  tests: state.TestReducer.tests,
  courses: state.CourseReducer.courses,
  modules: state.ModuleReducer.modules,
  questions: state.QuestionReducer.questions,
  modulesLoading: state.ModuleReducer.loading,
  testsLoading: state.TestReducer.loading,
});

const withForm = reduxForm(
  {
    form: 'optionCreate',
    validate,
  },
  OptionCreate,
);

export default compose(connect(mapStateToProps), withForm)(OptionCreate);
