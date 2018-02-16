import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import QuestionActions from '../../../Actions/CourseActions';
import LinearProgress from '../../../Components/LinearProgress';

const validate = () => {
  const errors = {};

  return errors;
};

class QuestionCreate extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(QuestionActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(QuestionActions.create(
      values.test,
      values.questionTitle,
      values.questionAllocatedMarks,
    ));
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
              {this.props.tests ? (
                <Field name="test" label="Test Name" component={Select}>
                  {this.props.tests.map(test => (
                    <MenuItem value={test.id} key={test.id}>
                      {test.name}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Tests
                </div>
              )}
              <div>
                <Field
                  name="QuestionTitle"
                  label="Question Title"
                  margin="normal"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="QuestionAllocatedMarks"
                  label="Allocated Marks"
                  margin="normal"
                  component={TextField}
                />
              </div>
            </div>
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
};

const mapStateToProps = state => ({
  tests: state.TestReducer.tests,
});

const withForm = reduxForm(
  {
    form: 'questionCreate',
    validate,
  },
  QuestionCreate,
);

export default compose(connect(mapStateToProps), withForm)(QuestionCreate);
