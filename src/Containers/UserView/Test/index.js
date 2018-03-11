import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';

import Card from '../../../Components/Card';
import history from '../../../Helpers/History';
import Button from '../../../Components/Button';
import TestActions from '../../../Actions/TestActions';

class UserTest extends React.Component {
  beginTest(userId, id) {
    this.props.dispatch(TestActions.loadTestQuestions(userId, id));
    history.push('/modules/test');
  }

  render() {
    // const { test } = this.props;
    const test = {
      id: 4,
      name: 'Example Test',
      moduleID: 2,
      totalMarks: 100,
      module: null,
      questions: null,
      questionIds: null,
      enrolments: null,
    };

    return (
      <div className="content">
        {test && (
          <Card width="800px" title={test.name}>
            <Typography variant="headline" component="h2">
              Test Total - {test.totalMarks}
            </Typography>
            <Typography component="p">Generic Test Rules Here</Typography>
            <br />
            <div className="row alignRight">
              <Button
                color="secondary"
                onClick={() => this.beginTest(2, test.id)}
              >
                Begin Test
              </Button>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

UserTest.propTypes = {
  // test: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  test: state.TestReducer.test,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTest);
