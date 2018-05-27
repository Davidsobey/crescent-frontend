/**
 *
 * QuestionEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';

import Select from '../../../Components/Select';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import QuestionActions from '../../../Actions/QuestionActions';
import TestActions from '../../../Actions/TestActions';

/* eslint-disable react/prefer-stateless-function */
class QuestionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.props.dispatch(TestActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(QuestionActions.editQuestion(values));
  };

  render() {
    return (
      <Card width="600px" title="Edit Question">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div>
            <Field name="testId" label="Test Name" component={Select}>
              {this.props.tests.map(test => (
                <MenuItem value={test.id} key={test.id}>
                  {test.name}
                </MenuItem>
              ))}
            </Field>
            <div>
              <Field
                name="title"
                label="Question Name"
                margin="normal"
                component={TextField}
              />
            </div>
            <div>
              <Field
                name="allocatedMarks"
                label="Allocated Marks"
                margin="normal"
                component={TextField}
              />
            </div>
          </div>
          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Edit Question
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}
QuestionEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tests: PropTypes.array,
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const QuestionEdited = reduxForm({
  form: 'questionEdit', // a unique identifier for this form
})(QuestionEdit);

// You have to connect() to any reducers that you wish to connect to yourself
const FormState = connect(
  state => ({
    initialValues: state.QuestionReducer.question, // pull initial values from reducer
    tests: state.TestReducer.tests,
  }),
  mapDispatchToProps,
)(QuestionEdited);

export default FormState;
