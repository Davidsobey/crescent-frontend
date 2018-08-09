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
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import QuestionActions from '../../../Actions/QuestionActions';
import OptionActions from '../../../Actions/OptionActions';
import { StyledDelete } from '../../../Styles/Delete';
import IconButton from '../../../Styles/IconButton';
import LinearProgress from '../../../Components/LinearProgress';

const required = value => value ? undefined : 'Required';

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
      <Card
        width="850px"
        title={`${
          this.props.question.questionTitle
            ? this.props.question.questionTitle
            : this.props.question.title
        } - Options`}
      >
        {this.props.options_loading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    {header.map(head => <TableCell key={head}>{head}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(this.props.options) ? (
                    this.props.options.map(option => (
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
                    ))
                  ) : this.props.options ? (
                    <TableRow key={this.props.options.id}>
                      <TableCell>
                        <TextField
                          id={this.props.options.title}
                          label={this.props.options.title}
                          value={this.props.options.title}
                          margin="normal"
                          width="50px"
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={this.props.options.isAnswer}
                          onChange={() =>
                            this.handleCheckChange(this.props.options)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip id="tooltip-delete" title="Delete">
                          <IconButton
                            aria-label="Delete"
                            onClick={() => this.handleDelete(this.props.options)}
                          >
                            <StyledDelete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow />
                  )}
                </TableBody>
              </Table>
            </Paper>
            <form
              onSubmit={this.props.handleSubmit(this.submit)}
              autoComplete="off"
            >
              {this.props.option_creating ? (
                <div>
                  <LinearProgress color="secondary" />
                  Creating Option
                </div>
              ) : (
                <div className={classes.createNew}>
                  <Field
                    name="questionTitle"
                    label="Option Title"
                    margin="normal"
                    component={TextField}
                    validate={[ required ]}
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
              )}
            </form>
          </div>
        )}
      </Card>
    );
  }
}

OptionCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  question: PropTypes.object,
  options: PropTypes.array,
  options_loading: PropTypes.bool,
  option_creating: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  question: state.QuestionReducer.question,
  options: Array.isArray(state.QuestionReducer.options)
    ? state.QuestionReducer.options
    : state.QuestionReducer.options &&
      Object.values(state.QuestionReducer.options),
  options_loading: state.QuestionReducer.options_loading,
  option_creating: state.QuestionReducer.option_creating,
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
