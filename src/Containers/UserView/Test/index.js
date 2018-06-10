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
    const { test, user } = this.props;

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
                onClick={() => this.beginTest(user.id, test.id)}
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
  test: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  test: state.TestReducer.test,
  user: state.LoginReducer.user,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTest);
