/**
 *
 * CourseView
 *
 */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import { reduxForm } from "redux-form";

import Card from "../../../Components/Card";
import AppBar from "../../../Components/AppBar";
import Button from "../../../Components/Button";
import Table from "../../../Components/Table";
import CourseActions from "../../../Actions/CourseActions";

const header = ["Name", "Description", "Category", "Grade"];

class CourseView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(CourseActions.getAll());
  }

  render() {
    const { courses } = this.props;
    return (
      <AppBar>
        <Card width="800px" title="Course List">
          {courses && <Table header={header} data={courses} />}
        </Card>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.CourseReducer.courses
  };
};

const withForm = reduxForm(
  {
    form: "courseView"
  },
  CourseView
);

export default compose(connect(mapStateToProps), withForm)(CourseView);
{
  /* <Table header={header} /> */
}
