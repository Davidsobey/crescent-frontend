import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import TestActions from '../../../Actions/TestActions';
import ModuleActions from '../../../Actions/ModuleActions';
import CourseActions from '../../../Actions/CourseActions';
import LinearProgress from '../../../Components/LinearProgress';
import OptionsModal from '../../../Components/OptionsModal';
import history from '../../../Helpers/History';

const validate = () => {
  const errors = {};

  return errors;
};

const options = [
  // {label: 'Create another assignment'},
  {label: 'Create another module', url: '/module/create'},
  {label: 'Create questions for this assignment', url: '/question/create'},
];

class TestCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(CourseActions.getAll());
    if (this.props.newCourseId)
      this.props.dispatch(ModuleActions.loadModuleByCourse(this.props.newCourseId))
    else
      this.props.dispatch(ModuleActions.clearModules());
  }

  componentWillMount () {
    this.props.initialize({ course: this.props.newCourseId, module: this.props.newModuleId });
  }

  submit = (values) => {
    this.props.dispatch(TestActions.create(values.module, values.testName, values.testMarks));
  };

  loadModules = (values) => {
    this.props.dispatch(ModuleActions.loadModuleByCourse(values.target.value));
  };

  onContinue = (index) => {
    this.props.dispatch(TestActions.closeRedirectModal());
    // if (index==0)
    //   this.props.initialize({ course: this.props.newCourseId, module: this.props.newModuleId, testName: '', testMarks: '' });
    // else
      history.push(options[index].url);
  }

  render() {
    return (
      <Card width="600px" title="Create New Assessment">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.courses ? (
                <div>
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
                </div>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses
                </div>
              )}
              {this.props.modules ? (
                <Field
                  name="module"
                  label="Module Name"
                  component={Select}
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
              {this.props.moduleLoading && (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Modules...
                </div>
              )}
              <div>
                <Field
                  name="testName"
                  label="Assessment Name"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="testMarks"
                  label="Total Marks"
                  margin="normal"
                  component={TextField}
                />
              </div>
            </div>
          </div>
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
  modules: PropTypes.array,
  courses: PropTypes.array,
  moduleLoading: PropTypes.bool,
  newCourseId: PropTypes.number,
  newModuleId: PropTypes.number,
  openRedirectModal: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    modules: state.ModuleReducer.modules,
    moduleLoading: state.ModuleReducer.loading,
    courses: state.CourseReducer.courses,
    newCourseId: state.CourseReducer.newCourseId,
    newModuleId: state.ModuleReducer.newModuleId,
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
