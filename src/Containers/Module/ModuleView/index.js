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
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';

import Card from '../../../Components/Card';
import CourseActions from '../../../Actions/CourseActions';
import ModuleActions from '../../../Actions/ModuleActions';
import { StyledDelete } from '../../../Styles/Delete';
import { StyledEdit } from '../../../Styles/Edit';
import IconButton from '../../../Styles/IconButton';
import CustomModal from '../../../Components/Modal/index';
import history from '../../../Helpers/History';

class ModuleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
    this.props.dispatch(CourseActions.getAll());
    this.props.dispatch(ModuleActions.getAll());
  }

  handleDelete = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  confirmDelete = obj => () => {
    this.props.dispatch(ModuleActions.deleteModule(obj.id));
    this.child.handleClose();
  };

  handleEdit = (editObj) => {
    this.props.dispatch(ModuleActions.loadModule(editObj.id));
    history.push('/module/edit');
  };

  loadData = (modules, courses) => {
    const formattedArray = [];
    if (Array.isArray(modules) && Array.isArray(courses)) {
      modules.forEach((module) => {
        const courseMatch = courses.filter(course => course.id === module.courseId);
        const newModule = {
          id: module.id,
          description: module.description,
          name: module.name,
          course: courseMatch[0].name,
        };
        formattedArray.push(newModule);
      });
      formattedArray.sort((a, b) => a.id - b.id);
    }
    return formattedArray;
  };

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Course',
        accessor: 'course',
      },
      {
        Header: 'Edit/Delete',
        accessor: 'edit/delete',
        Cell: row => (
          <div>
            <Tooltip id="tooltip-delete" title="Edit">
              <IconButton
                aria-label="Edit"
                onClick={() => this.handleEdit(row.original)}
              >
                <StyledEdit />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-delete" title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={() => this.handleDelete(row.original)}
              >
                <StyledDelete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ];
    const { courses, modules } = this.props;
    const data = this.loadData(modules, courses);
    return (
      <div>
        <Card width="800px" title="Module List">
          {Array.isArray(modules) && Array.isArray(courses) ? (
            <ReactTable
              columns={columns}
              data={data}
              filterable
              defaultPageSize={10}
              className="-striped -highlight"
            />
          ) : (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
          )}
        </Card>
        <CustomModal
          obj={this.state && this.state.obj}
          /* eslint-disable no-return-assign */
          onRef={ref => (this.child = ref)}
          onClick={this.confirmDelete(this.state.obj)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  modules: state.ModuleReducer.modules,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withForm = reduxForm(
  {
    form: 'courseView',
  },
  ModuleView,
);

ModuleView.propTypes = {
  courses: PropTypes.array,
  dispatch: PropTypes.func,
  modules: PropTypes.array,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(ModuleView);
