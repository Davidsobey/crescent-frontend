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
import Button from '../../../Components/Button/index';

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

  loadModule = (id, name, description) => {
    console.log(id, name, description);
    this.props.dispatch(ModuleActions.getMaterialsForModule(id, name, description));
    history.push('/module/material/detail');
  };

  loadData = (modules, courses) => {
    const data = [];
    if (Array.isArray(modules) && Array.isArray(courses)) {
      modules
        // .filter(module => module.moduleMaterialLink)
        .forEach((module) => {
          const courseMatch = courses.filter(course => course.id === module.courseId);
          const newModule = {
            id: module.id,
            name: module.name,
            description: module.description,
            course: courseMatch.length ? courseMatch[0].name : '',
          };
          data.push(newModule);
        });
      data.sort((a, b) => a.id - b.id);
    }
    return data;
  };

  render() {
    const columns = [
      {
        Header: 'Module Name',
        accessor: 'name',
      },
      {
        Header: 'Key Outcome',
        accessor: 'description',
      },
      {
        Header: 'Course Name',
        accessor: 'course',
      },
      {
        Header: 'Module Material',
        accessor: 'material/details',
        Filter: <div />,
        Cell: row => (
          <div>
            <Button
              className="small-font"
              color="primary"
              onClick={() => this.loadModule(row.original.id, row.original.name, row.original.description)}
            >
              View Material
            </Button>
          </div>
        ),
      },
      {
        Header: 'Edit/Delete',
        accessor: 'edit/delete',
        Filter: <div />,
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
    return (
      <div>
        <Card width="800px" title="Module List">
          {this.props.courses_loading || this.props.modules_loading ? (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <ReactTable
              columns={columns}
              data={this.loadData(modules, courses)}
              filterable
              defaultPageSize={10}
              className="-striped -highlight"
            />
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
  courses_loading: state.CourseReducer.loading,
  modules: state.ModuleReducer.modules,
  modules_loading: state.ModuleReducer.loading,
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
  dispatch: PropTypes.func,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  modules: PropTypes.array,
  modules_loading: PropTypes.bool,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(ModuleView);
