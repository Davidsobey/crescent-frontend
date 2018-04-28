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

import history from '../../../Helpers/History';
import Card from '../../../Components/Card/index';
import Table from '../../../Components/Table/index';
import TestActions from '../../../Actions/TestActions';

const header = ['ID', 'Name', 'Module', 'Total Marks', 'Edit/Delete'];

class TestView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(TestActions.getAll());
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(testObject) {
    this.props.dispatch(TestActions.EditTest(testObject));
    history.push('/test/edit');
  }

  render() {
    const { tests } = this.props;
    return (
      <Card width="800px" title="Test List">
        {Array.isArray(tests) ? (
          <Table
            header={header}
            data={tests}
            del="Test"
            edit="/test/edit"
            handleEdit={this.handleEdit}
          />
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

const mapDispatchToProps = dispatch => ({
  dispatch,
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

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(TestView);
