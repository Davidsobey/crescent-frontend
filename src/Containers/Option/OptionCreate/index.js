import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import { Paper, Checkbox } from 'material-ui';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import QuestionActions from '../../../Actions/QuestionActions';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';
import TestActions from '../../../Actions/TestActions';
import OptionActions from '../../../Actions/OptionActions';
import { StyledDelete } from '../../../Styles/Delete';
import IconButton from '../../../Styles/IconButton';

const validate = () => {
  const errors = {};

  return errors;
};
const header = ['Question Title', 'Correct Answer', 'Remove Answer'];

class OptionCreate extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     options: props.options,
  //   };
  // }

  componentDidMount() {
    this.props.dispatch(CourseActions.getAll());
  }

  loadModules = (values) => {
    this.props.dispatch(ModuleActions.loadModuleByCourse(values.target.value));
  };

  loadTests = (values) => {
    this.props.dispatch(TestActions.loadTestByModule(values.target.value));
  };

  loadQuestions = (values) => {
    this.props.dispatch(QuestionActions.loadQuestionsByTest(values.target.value));
  };

  submit = (values) => {
    this.props.dispatch(OptionActions.create(
      values.test,
      values.questionTitle,
      values.questionAllocatedMarks,
    ));
  };

  render() {
    return (
      <Card width="850px" title={`${this.props.question.title} - Options`}>
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  {header.map(head => <TableCell key={head}>{head}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.options.map(option => (
                  <TableRow key={option.id}>
                    <TableCell>
                      <TextField
                        id={option.title}
                        label={option.title}
                        value={option.title}
                        margin="normal"
                        width="50px"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Tooltip id="tooltip-delete" title="Delete">
                        <IconButton
                          aria-label="Delete"
                          onClick={() => this.handleDelete(option)}
                        >
                          <StyledDelete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <br />
          <br />
          <br />

          <div className="alignRight">
            <Button variant="raised" color="primary" type="submit">
              Create Option
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

OptionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  question: PropTypes.object,
  options: PropTypes.array,
};

const mapStateToProps = state => ({
  question: state.QuestionReducer.question,
  options: state.QuestionReducer.options,
});

const withForm = reduxForm(
  {
    form: 'optionCreate',
    validate,
  },
  OptionCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(OptionCreate);
