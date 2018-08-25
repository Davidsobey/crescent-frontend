import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import QuestionActions from '../../../Actions/QuestionActions';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';
import TestActions from '../../../Actions/TestActions';
import history from '../../../Helpers/History';

const validate = () => {
  const errors = {};

  return errors;
};
let questions = [];
const required = value => (value ? undefined : 'Required');
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
const question_exists = value => (value && Array.isArray(questions) ? questions.filter(question => question.title==value).length ? 'Question already exists' : undefined : undefined);

class QuestionCreate extends React.Component {
  componentDidMount() {
    this.props.dispatch(CourseActions.getAll());
    if (this.props.newCourseId) {
      this.props.dispatch(ModuleActions.loadModuleByCourse(this.props.newCourseId));
      this.props.initialize({ course: this.props.newCourseId });

      if (this.props.newModuleId) {
        this.props.dispatch(TestActions.loadTestByModule(this.props.newModuleId));
        this.props.initialize({ course: this.props.newCourseId, module: this.props.newModuleId });

        if (this.props.newTestId) {
          this.props.dispatch(QuestionActions.loadQuestionByTest(this.props.newTestId));
          this.props.initialize({ course: this.props.newCourseId, module: this.props.newModuleId, test: this.props.newTestId });
        } else {
          this.props.dispatch(QuestionActions.clearQuestion());
        }
      } else {
        this.props.dispatch(QuestionActions.clearQuestion());
        this.props.dispatch(TestActions.clearTests());
      }
    } else {
      this.props.dispatch(QuestionActions.clearQuestion());
      this.props.dispatch(TestActions.clearTests());
      this.props.dispatch(ModuleActions.clearModules());
    }
  }

  componentWillMount() {
    this.props.initialize({ course: this.props.newCourseId, module: this.props.newModuleId, test: this.props.newTestId });
  }

  loadModules = (values) => {
    this.props.dispatch(ModuleActions.loadModuleByCourse(values.target.value));
    this.props.dispatch(QuestionActions.clearQuestion());
    this.props.dispatch(TestActions.clearTests());
  };

  loadTests = (values) => {
    this.props.dispatch(TestActions.loadTestByModule(values.target.value));
    this.props.dispatch(QuestionActions.clearQuestion());
  };

  loadQuestions = (values) => {
    this.props.dispatch(QuestionActions.loadQuestionByTest(values.target.value));
  };

  submit = (values) => {
    this.props.dispatch(QuestionActions.create(values));
  };

  render() {
    const isValidModule = (module =>
      (Array.isArray(module.moduleMaterialIds) ? module.moduleMaterialIds.length : false) &&
      (Array.isArray(module.testIds) ? module.testIds.length : false)
    );
    const isValidCourse = (course => (Array.isArray(course.modules) ? course.modules.filter(isValidModule).length : false));
    questions = this.props.questions;
    return (
      <Card width="600px" title="Create New Question">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          autoComplete="off"
          className="centerForm"
        >
          <div>
            {this.props.courses_loading ? (
              <div>
                <LinearProgress color="secondary" />
                Loading Courses
              </div>
            ) : (
              <div>
                <Field
                  name="course"
                  onChange={this.loadModules}
                  label="Course Name"
                  component={Select}
                  validate={[required]}
                >
                  {(Array.isArray(this.props.courses) ? this.props.courses : [])
                  .filter(isValidCourse)
                  .map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Field>
              </div>
            )}
            {this.props.modules_loading ? (
              <div>
                <LinearProgress color="secondary" />
                Loading Modules...
              </div>
            ) : this.props.modules ? (
              <div>
                <Field
                  name="module"
                  label="Module Name"
                  component={Select}
                  onChange={this.loadTests}
                  validate={[required]}
                >
                  {(Array.isArray(this.props.modules) ? this.props.modules : [])
                  .filter(isValidModule)
                  .map(module => (
                    <MenuItem value={module.id} key={module.id}>
                      {module.name}
                    </MenuItem>
                  ))}
                </Field>
              </div>
            ) : (
              <div>
                <Typography variant="caption" component="p">
                  Choose a course to load related modules
                </Typography>
              </div>
            )}
            {this.props.tests_loading ? (
              <div>
                <LinearProgress color="secondary" />
                Loading Assessments...
              </div>
            ) : this.props.tests ? (
              <div>
                <Field
                  name="test"
                  label="Assessment Name"
                  component={Select}
                  onChange={this.loadQuestions}
                  validate={[required]}
                >
                  {(Array.isArray(this.props.tests) ? this.props.tests : [])
                  .map(test => (
                    <MenuItem value={test.id} key={test.id}>
                      {test.name}
                    </MenuItem>
                  ))}
                </Field>
              </div>
            ) : (
              <div>
                <Typography variant="caption" component="p">
                  Choose a module to load related tests
                </Typography>
              </div>
            )}
            {this.props.questions_loading ? (
              <div>
                <LinearProgress color="secondary" />
                Loading Questions
              </div>
            ) : (
              <div>
                <Field
                  name="questionTitle"
                  label="Question"
                  margin="normal"
                  component={TextField}
                  validate={[required, question_exists]}
                />
              </div>
            )}
            <div>
              <Field
                name="questionAllocatedMarks"
                label="Allocated Marks"
                margin="normal"
                component={TextField}
                validate={[required, number]}
              />
            </div>
          </div>
          {this.props.question_creating ? (
            <div style={{ width: '400px' }}>
              <LinearProgress color="secondary" />
              Creating Question
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Question
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

QuestionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  newCourseId: PropTypes.number,
  modules: PropTypes.array,
  modules_loading: PropTypes.bool,
  newModuleId: PropTypes.number,
  tests: PropTypes.array,
  tests_loading: PropTypes.bool,
  newTestId: PropTypes.number,
  questions: PropTypes.array,
  questions_loading: PropTypes.bool,
  question_creating: PropTypes.bool,
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  courses_loading: state.CourseReducer.loading,
  newCourseId: state.CourseReducer.newCourseId,
  modules: state.ModuleReducer.modules,
  modules_loading: state.ModuleReducer.loading,
  newModuleId: state.ModuleReducer.newModuleId,
  tests: state.TestReducer.tests,
  tests_loading: state.TestReducer.loading,
  newTestId: state.TestReducer.newTestId,
  questions: state.QuestionReducer.questions,
  questions_loading: state.QuestionReducer.loading,
  question_creating: state.QuestionReducer.creating,
});

const withForm = reduxForm(
  {
    form: 'questionCreate',
    validate,
  },
  QuestionCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(QuestionCreate);
