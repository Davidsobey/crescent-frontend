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
import { CircularProgress } from 'material-ui/Progress';

import Select from '../../../Components/Select';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import QuestionActions from '../../../Actions/QuestionActions';
import TestActions from '../../../Actions/TestActions';
import LinearProgress from '../../../Components/LinearProgress';

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

/* eslint-disable react/prefer-stateless-function */
class QuestionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(TestActions.getAll());
  }

  submit = (values) => {
    this.props.dispatch(QuestionActions.editQuestion(values));
  };

  render() {
    return (
      <Card width="600px" title="Edit Question">
        {this.props.question_loading ? (
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
              {!this.props.tests_loading ? (
                <div>
                  <Field 
                    name="testId" 
                    label="Assessment Name" 
                    component={Select}
                    validate={[ required ]}
                  >
                    {(Array.isArray(this.props.tests) ? this.props.tests : [])
                    .map(test => (
                      <MenuItem value={test.id} key={test.id}>
                        {test.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              ) : (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Tests
                </div>
              )}
              <div>
                <Field
                  name="title"
                  label="Question Name"
                  margin="normal"
                  component={TextField}
                  validate={[ required ]}
                />
              </div>
              <div>
                <Field
                  name="allocatedMarks"
                  label="Allocated Marks"
                  margin="normal"
                  component={TextField}
                  validate={[ required, number ]}
                />
              </div>
            </div>
            {this.props.question_editing ? (
              <div style={{width: '400px'}}>
                <LinearProgress color="secondary" />
                Editing Question
              </div>
            ) : (
              <div className="formAlignRight">
                <Button
                  className="buttonFormat"
                  variant="raised"
                  color="primary"
                  type="submit"
                >
                Edit Question
                </Button>
              </div>
            )}
          </form>
        )}
      </Card>
    );
  }
}
QuestionEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tests: PropTypes.array,
  tests_loading: PropTypes.bool,
  question_loading: PropTypes.bool,
  question_editing: PropTypes.bool,
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
    tests_loading: state.TestReducer.loading,
    question_loading: state.QuestionReducer.question_loading,
    question_editing: state.QuestionReducer.question_editing,
  }),
  mapDispatchToProps,
)(QuestionEdited);

export default FormState;
