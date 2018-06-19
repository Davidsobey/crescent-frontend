import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import { Paper, Checkbox } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import QuestionActions from '../../../Actions/QuestionActions';
import OptionActions from '../../../Actions/OptionActions';
import { StyledDelete } from '../../../Styles/Delete';
import IconButton from '../../../Styles/IconButton';

const header = ['Question Title', 'Correct Answer', 'Remove Answer'];
const styles = {
  createNew: {
    marginLeft: 20,
    display: 'flex',
  },
  tickbox: {
    marginTop: 24,
    marginLeft: 100,
  },
  button: {
    marginLeft: 115,
    marginTop: 30,
  },
};
class OptionCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ticked: false };
    this.submit = this.submit.bind(this);
  }
  loadQuestions = (values) => {
    this.props.dispatch(QuestionActions.loadQuestionsByTest(values.target.value));
  };

  handleCheckChange = (values) => {
    this.props.dispatch(QuestionActions.editOptionIsAnswer(values));
  };

  handleDelete = (values) => {
    this.props.dispatch(QuestionActions.deleteQuestionOption(values.id));
  };

  changeState() {
    const state = !this.state.ticked;
    this.setState({ ticked: state });
  }

  submit = (values) => {
    this.props.dispatch(OptionActions.create(
      this.props.question.id,
      values.questionTitle,
      this.state.ticked,
    ));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card width="850px" title={`${this.props.question.title} - Options`}>
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
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={option.isAnswer}
                      onChange={() => this.handleCheckChange(option)}
                    />
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
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
        >
          <div className={classes.createNew}>
            <Field
              name="questionTitle"
              label="Question Title"
              margin="normal"
              component={TextField}
            />
            <Checkbox
              checked={this.state.ticked}
              onClick={() => this.changeState()}
              className={classes.tickbox}
            />
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              type="submit"
            >
              Create
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
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  question: state.QuestionReducer.question,
  options: Array.isArray(state.QuestionReducer.options)
    ? state.QuestionReducer.options
    : Object.values(state.QuestionReducer.options),
});

const withForm = reduxForm(
  {
    form: 'optionCreate',
  },
  OptionCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
  withStyles(styles),
)(OptionCreate);
