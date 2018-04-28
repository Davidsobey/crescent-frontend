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
import CourseActions from '../../../Actions/CourseActions';

const header = ['ID', 'Name', 'Description', 'Category', 'Grade'];

class CourseView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(CourseActions.getAll());
  }

  render() {
    const { courses } = this.props;
    return (
      <Card width="800px" title="Course List">
        {Array.isArray(courses) ? (
          <Table header={header} data={courses} />
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
  courses: state.CourseReducer.courses,
});

const withForm = reduxForm(
  {
    form: 'courseView',
  },
  CourseView,
);

CourseView.propTypes = {
  courses: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(CourseView);
