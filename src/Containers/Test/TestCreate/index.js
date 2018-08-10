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
import TestActions from '../../../Actions/TestActions';
import ModuleActions from '../../../Actions/ModuleActions';
import CourseActions from '../../../Actions/CourseActions';
import OptionsModal from '../../../Components/OptionsModal';
import history from '../../../Helpers/History';

const validate = () => {
  const errors = {};

  return errors;
};
let tests = [];
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const test_exists = value => value && Array.isArray(tests) ? tests.filter(test => test.name==value).length ? 'Test already exists' : undefined : undefined;

const options = [
  // {label: 'Create another assignment'},
  {label: 'Create another module', url: '/module/create'},
  {label: 'Create questions for this assignment', url: '/question/create'},
];

class TestCreate extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(CourseActions.getAll());
    if (this.props.newCourseId) {
      this.props.dispatch(ModuleActions.loadModuleByCourse(this.props.newCourseId));
      this.props.initialize({ course: this.props.newCourseId });

      if (this.props.newModuleId) {
        this.props.dispatch(TestActions.loadTestByModule(this.props.newModuleId));
        this.props.initialize({ course: this.props.newCourseId, module: this.props.newModuleId });
      }
      else {
        this.props.dispatch(TestActions.clearTests());
      }
    }
    else {
      this.props.dispatch(ModuleActions.clearModules());
      this.props.dispatch(TestActions.clearTests());
    }
  }
  
  loadModules = (values) => {
    this.props.dispatch(ModuleActions.loadModuleByCourse(values.target.value));
    this.props.dispatch(TestActions.clearTests());
  };
  
  loadTests = (values) => {
    this.props.dispatch(TestActions.loadTestByModule(values.target.value));
  };

  submit = (values) => {
    this.props.dispatch(TestActions.create(values.module, values.testName, values.testMarks));
  };

  onContinue = (index) => {
    this.props.dispatch(TestActions.closeRedirectModal());
    // if (index==0)
    //   this.props.initialize({ course: this.props.newCourseId, module: this.props.newModuleId, testName: '', testMarks: '' });
    // else
      history.push(options[index].url);
  }

  render() {
    const isValidModule = (module => Array.isArray(module.moduleMaterialIds) ? module.moduleMaterialIds.length : false);
    const isValidCourse = (course => Array.isArray(course.modules) ? course.modules.filter(isValidModule).length : false);
    tests = this.props.tests;
    return (
      <Card width="600px" title="Create New Assessment">
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
                  validate={[ required ]}
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
                  validate={[ required ]}
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
                Loading Assessments
              </div>
            ) : (
              <div>
                <Field
                  name="testName"
                  label="Assessment Name"
                  margin="normal"
                  component={TextField}
                  validate={[ required, test_exists ]}
                />
              </div>
            )}
            <div>
              <Field
                name="testMarks"
                label="Total Marks"
                margin="normal"
                component={TextField}
                validate={[ required, number ]}
              />
            </div>
          </div>
          {this.props.test_creating ? (
            <div style={{width: '400px'}}>
              <LinearProgress color="secondary" />
              Creating Test
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Test
              </Button>
            </div>
          )}
        </form>
        <OptionsModal
          title="Test created successfully."
          open={this.props.openRedirectModal?this.props.openRedirectModal:false}
          onClick={this.onContinue.bind(this)}
          options={options}
        />
      </Card>
    );
  }
}

TestCreate.propTypes = {
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
  test_creating: PropTypes.bool,
  openRedirectModal: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    courses: state.CourseReducer.courses,
    courses_loading: state.CourseReducer.loading,
    newCourseId: state.CourseReducer.newCourseId,
    modules: state.ModuleReducer.modules,
    modules_loading: state.ModuleReducer.loading,
    newModuleId: state.ModuleReducer.newModuleId,
    tests: state.TestReducer.tests,
    tests_loading: state.TestReducer.loading,
    test_creating: state.TestReducer.creating,
    openRedirectModal: state.TestReducer.openRedirectModal,
  };
}

const withForm = reduxForm(
  {
    form: 'testCreate',
    validate,
  },
  TestCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(TestCreate);
