import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};

class ModuleCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(CourseActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(ModuleActions.create(
      values.course,
      values.moduleName,
      values.moduleDescription,
    ));
  };

  render() {
    return (
      <Card width="600px" title="Create New Module">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.courses ? (
                <Field name="course" label="Course Name" component={Select}>
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
              <div>
                <Field
                  name="moduleName"
                  label="Module Name"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="moduleDescription"
                  label="Module Description"
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
              Create Module
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

ModuleCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
});

const withForm = reduxForm(
  {
    form: 'courseCreate',
    validate,
  },
  ModuleCreate,
);

export default compose(connect(mapStateToProps), withForm)(ModuleCreate);
