/**
 *
 * ModuleView
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
import ModuleActions from '../../../Actions/ModuleActions';

const header = ['ID', 'Name', 'Description', 'Category'];

class CourseView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(CourseActions.getAll());
    this.props.dispatch(ModuleActions.getAll());
  }

  // courses.map((course) => {
  //   if (module.couseID === course.id) {
  //     formattedModule.couseID = course.name;
  //     return formattedModule;
  //   }
  //   return formattedModule;
  // });

  loadData = (modules, courses) => {
    const formattedArray = [];
    if (Array.isArray(modules)) {
      modules.forEach((module) => {
        const courseMatch = courses.filter(course => course.id === module.courseId);
        const newModule = {
          id: module.id,
          description: module.description,
          name: module.name,
          couse: courseMatch[0].name,
        };
        formattedArray.push(newModule);
      });
      formattedArray.sort((a, b) => a.id - b.id);
    }
    return formattedArray;
  };

  render() {
    const { courses, modules } = this.props;
    const data = this.loadData(modules, courses);
    return (
      <Card width="800px" title="Module List">
        {Array.isArray(modules) && Array.isArray(courses) ? (
          <Table header={header} data={data} />
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
  modules: state.ModuleReducer.modules,
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
  modules: PropTypes.array,
};

export default compose(connect(mapStateToProps), withForm)(CourseView);
