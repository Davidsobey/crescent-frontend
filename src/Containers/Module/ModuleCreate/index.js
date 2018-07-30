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
import OptionsModal from '../../../Components/OptionsModal';
import history from '../../../Helpers/History';

const validate = () => {
  const errors = {};

  return errors;
};

const options = [
  {label: 'Create another module'},
  {label: 'Create an assignment for this module', url: '/assessment/create'},
  {label: 'Upload module material for this module', url: '/module/material/create'},
];

class ModuleCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(CourseActions.getAll());
  }
  
  componentWillMount () {
    this.props.initialize({ course: this.props.newCourseId });
  }

  submit = (values) => {
    this.props.dispatch(ModuleActions.create(
      values.course,
      values.moduleName,
      values.moduleDescription,
    ));
  };

  onContinue = (index) => {
    this.props.dispatch(ModuleActions.closeRedirectModal());
    if (index==0)
      this.props.initialize({ course: this.props.newCourseId, moduleName: '', moduleDescription: '' });
    else
      history.push(options[index].url);
  }

  render() {
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
              {this.props.courses ? (
                <Field name="course" label="Course Name" component={Select} >
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
                  label="Name"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="moduleDescription"
                  label="Key Outcome"
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
        <OptionsModal
          title="Module created successfully."
          open={this.props.openRedirectModal?this.props.openRedirectModal:false}
          onClick={this.onContinue.bind(this)}
          options={options}
        />
      </Card>
    );
  }
}

ModuleCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  newCourseId: PropTypes.number,
  openRedirectModal: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  newCourseId: state.CourseReducer.newCourseId,
  openRedirectModal: state.ModuleReducer.openRedirectModal,
  loading: state.ModuleReducer.loading,
});

const withForm = reduxForm(
  {
    form: 'courseCreate',
    validate,
  },
  ModuleCreate,
);

export default compose(connect(mapStateToProps), withForm)(ModuleCreate);
