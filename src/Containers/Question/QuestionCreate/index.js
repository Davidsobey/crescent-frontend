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
import QuestionActions from '../../../Actions/QuestionActions';
import LinearProgress from '../../../Components/LinearProgress';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';
import TestActions from '../../../Actions/TestActions';

const validate = () => {
  const errors = {};

  return errors;
};

class QuestionCreate extends React.Component {
  componentDidMount() {
    this.props.dispatch(CourseActions.getAll());
  }

  loadModules = (values) => {
    this.props.dispatch(ModuleActions.loadModuleByCourse(values.target.value));
  };

  loadTests = (values) => {
    this.props.dispatch(TestActions.loadTestByModule(values.target.value));
  };

  submit = (values) => {
    this.props.dispatch(QuestionActions.create(values));
  };

  render() {
    return (
      <Card width="600px" title="Create New Question">
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
            {this.props.modules && (
              <div className="width200">
                {this.props.modules &&
                this.props.tests &&
                this.props.tests.length > 0 ? (
                  <Field name="test" label="Test Name" component={Select}>
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
                <div>
                  <Field
                    name="questionTitle"
                    label="Question Title"
                    margin="normal"
                    component={TextField}
                  />
                </div>
                <div>
                  <Field
                    name="questionAllocatedMarks"
                    label="Allocated Marks"
                    margin="normal"
                    component={TextField}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Create Question
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

QuestionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  tests: PropTypes.array,
  courses: PropTypes.array,
  modules: PropTypes.array,
  modulesLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  tests: state.TestReducer.tests,
  courses: state.CourseReducer.courses,
  modules: state.ModuleReducer.modules,
  modulesLoading: state.ModuleReducer.loading,
});

const withForm = reduxForm(
  {
    form: 'questionCreate',
    validate,
  },
  QuestionCreate,
);

export default compose(connect(mapStateToProps), withForm)(QuestionCreate);
