import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';

const validate = () => {
  const errors = {};

  return errors;
};
let modules = [];
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const module_exists = value => value && Array.isArray(modules) ? modules.filter(module => module.name==value).length ? 'Module already exists' : undefined : undefined;

class ModuleCreate extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount () {
    this.props.dispatch(CourseActions.getAll());
    if (this.props.newCourseId) {
      this.props.initialize({ course: this.props.newCourseId });
      this.props.dispatch(ModuleActions.loadModuleByCourse(this.props.newCourseId));
    }
  }
  
  loadModules = (values) => {
    this.props.dispatch(ModuleActions.loadModuleByCourse(values.target.value));
  };

  submit = (values) => {
    this.props.dispatch(ModuleActions.create(
      values.course,
      values.moduleName,
      values.moduleDescription,
    ));
  };

  render() {
    modules = this.props.modules;
    return (
      <Card width="600px" title="Create New Module">
        {this.props.loading && <LinearProgress color="secondary" />}
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
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
                  Loading Modules
                </div>
              ) : (
                <div>
                  <Field
                    name="moduleName"
                    label="Name"
                    margin="normal"
                    component={TextField}
                    validate={[ required, module_exists ]}
                  />
                </div>
              )}
              <div>
                <Field
                  name="moduleDescription"
                  label="Key Outcome"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
            </div>
          </div>
          {this.props.module_creating ? (
            <div style={{width: '400px'}}>
              <LinearProgress color="secondary" />
              Creating Module
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Module
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

ModuleCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  newCourseId: PropTypes.number,
  modules: PropTypes.array,
  modules_loading: PropTypes.bool,
  module_creating: PropTypes.bool,
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  courses_loading: state.CourseReducer.loading,
  newCourseId: state.CourseReducer.newCourseId,
  modules: state.ModuleReducer.modules,
  modules_loading: state.ModuleReducer.loading,
  module_creating: state.ModuleReducer.creating,
});

const withForm = reduxForm(
  {
    form: 'courseCreate',
    validate,
  },
  ModuleCreate,
);

export default compose(connect(mapStateToProps), withForm)(ModuleCreate);
