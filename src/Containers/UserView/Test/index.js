import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';

import Card from '../../../Components/Card';
import history from '../../../Helpers/History';
import Button from '../../../Components/Button';
import TestActions from '../../../Actions/TestActions';

class UserTest extends React.Component {
  beginTest(userId, testId, courseId) {
    this.props.dispatch(TestActions.enrolmentTest(testId, courseId, userId));
    history.push('/modules/test');
  }

  render() {
    const { test, user, course } = this.props;

    return (
      <div className="content">
        {test && (
          <Card width="800px" title={test.name}>
            <Typography variant="headline" component="h2">
              Assessment Total - {test.totalMarks}
            </Typography>
            <Typography component="p">All answers must be your own</Typography>
            <br />
            <div className="row alignRight">
              <Button
                color="secondary"
                onClick={() => this.beginTest(user.id, test.id, course.id)}
              >
                Begin Assessment
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
  course: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  test: state.TestReducer.test,
  user: state.LoginReducer.user,
  course: state.CourseReducer.course,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTest);
