/**
 *
 * CourseView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import Table from '../../../Components/Table';
import TestActions from '../../../Actions/TestActions';

const header = ['ID', 'Name', 'Module', 'Total Marks'];

class TestView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(TestActions.getAll());
  }

  render() {
    const { tests } = this.props;
    return (
      <Card width="800px" title="Test List">
        {Array.isArray(tests) ? (
          <Table header={header} data={tests} />
        ) : (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  tests: state.TestReducer.tests,
});

const withForm = reduxForm(
  {
    form: 'courseView',
  },
  TestView,
);

TestView.propTypes = {
  tests: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(TestView);
