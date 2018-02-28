import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '../../../Components/Card';

function CourseDetail(props) {
  const { course } = props;
  if (course) {
    return (
      <div className="content">
        <Card width="500px" title={course.name}>
          <div>Details of Corse to follow</div>
        </Card>
      </div>
    );
  }
  return <div />;
}

CourseDetail.propTypes = {
  course: PropTypes.object,
};

const mapStateToProps = state => ({
  course: state.CourseReducer.course,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
