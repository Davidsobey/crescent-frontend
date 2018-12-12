/**
 *
 * CourseEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import CourseActions from '../../../Actions/CourseActions';

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

class CourseEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = (values) => {
    this.props.dispatch(CourseActions.editCourse(values));
  };

  render() {
    return (
      <Card width="600px" title="Edit Course">
        {this.props.course_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <form 
            onSubmit={this.props.handleSubmit(this.submit)} 
            autoComplete="off" 
            className="centerForm"
          >
            <div>
              <div>
                <Field
                  name="name"
                  label="Course Name"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
              <div>
                <Field
                  name="description"
                  label="Course Description"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
            </div>
            {this.props.course_editing ? (
              <div style={{width: '400px'}}>
                <LinearProgress color="secondary" />
                Editing Course
              </div>
            ) : (
              <div className="formAlignRight">
                <Button
                  className="buttonFormat"
                  variant="raised"
                  color="primary"
                  type="submit"
                >
                  Edit Course
                </Button>
              </div>
            )}
          </form>
        )}
      </Card>
    );
  };
}

CourseEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  course_loading: PropTypes.bool,
  course_editing: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const CourseEdited = reduxForm({
  form: 'courseEdit', // a unique identifier for this form
})(CourseEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.CourseReducer.course, // pull initial values from reducer
    course_loading: state.CourseReducer.course_loading,
    course_editing: state.CourseReducer.course_editing,
  }),
  mapDispatchToProps,
)(CourseEdited);

export default FormState;
