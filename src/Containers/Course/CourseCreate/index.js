/**
 *
 * CourseCreate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import LinearProgress from '../../../Components/LinearProgress';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import CourseActions from '../../../Actions/CourseActions';

const validate = () => {
  const errors = {};

  return errors;
};

/* eslint-disable react/prefer-stateless-function */
class CourseCreate extends React.Component {
  submit = (values) => {
    this.props.dispatch(CourseActions.create(values));
  };

  render() {
    return (
      <Card width="600px" title="Create New Course">
        {this.props.loading && <LinearProgress color="secondary" />}
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              <Field
                name="courseName"
                label="Course Name"
                margin="normal"
                component={TextField}
              />
            </div>
            <div>
              <Field
                name="courseDescription"
                label="Course Description"
                margin="normal"
                component={TextField}
              />
            </div>
            <div>
              <Field
                name="cpdHours"
                label="Course CPD Hours"
                margin="normal"
                component={TextField}
              />
            </div>
          </div>
          <div className="formAlignRight">
            <Button
              className="buttonFormat"
              variant="raised"
              color="primary"
              type="submit"
            >
              Create Course
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.CourseReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

CourseCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const withForm = reduxForm(
  {
    form: 'courseCreate',
    validate,
  },
  CourseCreate,
);

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(CourseCreate);
