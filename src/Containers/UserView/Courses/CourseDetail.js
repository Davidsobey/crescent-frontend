import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import history from '../../../Helpers/History';
import Button from '../../../Components/Button';
import ModuleActions from '../../../Actions/ModuleActions';
import TestActions from '../../../Actions/TestActions';

class CourseDetail extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = module => (event, expanded) => {
    this.setState({
      expanded: expanded ? module.id : false,
    });
    if (module.moduleMaterialIds) {
      this.props.dispatch(ModuleActions.moduleMaterial(module.moduleMaterialIds));
    }
    this.props.dispatch(ModuleActions.loadModuleTests(module.id));
  };

  loadTest(id) {
    this.props.dispatch(TestActions.loadTest(id));
    history.push('/modules/starttest');
  }

  render() {
    const {
      course, modules, moduleMaterial, moduleTests,
    } = this.props;
    const { expanded } = this.state;

    return (
      <div className="content">
        {course && course.name ? (
          <Card width="800px" title={course.name}>
            <Typography variant="headline" component="h2">
              Course Description
            </Typography>
            <Typography component="p">{course.description}</Typography>
            <br />
            {modules ? (
              <div>
                <div className="inline">
                  <Typography variant="headline" component="h2">
                    Course Related Modules
                  </Typography>
                  <Typography variant="caption" className="alignCenter">
                    {
                      ' - (Expand Items to view the module details and material)'
                    }
                  </Typography>
                </div>
                {modules.map(module => (
                  <ExpansionPanel
                    expanded={expanded === module.id}
                    onChange={this.handleChange(module)}
                    key={module.id}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="headline" component="h2">
                        {module.name}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="justify-content">
                      <div>
                        <div>
                          <Typography variant="title">
                            Module Material
                          </Typography>
                          {moduleMaterial && moduleMaterial.length > 0 ? (
                            moduleMaterial.map(material => (
                              <Button
                                key={material.id}
                                color="secondary"
                                onClick={() =>
                                  window.open(
                                    `https://crescenttesting.azurewebsites.net/ModuleMaterial/${
                                      material.filePath
                                    }`,
                                    '_blank',
                                  )
                                }
                              >
                                {material.filePath}
                              </Button>
                            ))
                          ) : this.props.loadingMaterial ? (
                            <div>
                              <LinearProgress color="secondary" />
                              Loading Module Material
                            </div>
                          ) : (
                            <div>
                              <Typography>No Material</Typography>
                            </div>
                          )}
                        </div>
                        <div>
                          <Typography variant="title">Module Tests</Typography>
                          {moduleTests && moduleTests.length > 0 ? (
                            moduleTests.map(test => (
                              <Button
                                key={test.id}
                                color="secondary"
                                onClick={() => this.loadTest(test.id)}
                              >
                                {test.name}
                              </Button>
                            ))
                          ) : this.props.loadingTests ? (
                            <div>
                              <LinearProgress color="secondary" />
                              Loading Assignments
                            </div>
                          ) : (
                            <div>
                              <Typography>No Assignments</Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </div>
            ) : (
              <div className="center">
                <LinearProgress color="secondary" />
                Loading modules
              </div>
            )}
          </Card>
        ) : (
          <Button
            onClick={() => {
              history.push('/courses/list');
            }}
          >
            Return to Course List
          </Button>
        )}
      </div>
    );
  }
}

CourseDetail.propTypes = {
  course: PropTypes.object,
  modules: PropTypes.array,
  moduleMaterial: PropTypes.array,
  dispatch: PropTypes.func,
  moduleTests: PropTypes.array,
  loadingMaterial: PropTypes.bool,
  loadingTests: PropTypes.bool,
};

const mapStateToProps = state => ({
  course: state.CourseReducer.course,
  modules: state.ModuleReducer.modules,
  moduleMaterial: state.ModuleReducer.moduleMaterial,
  loading: state.ModuleReducer.loading,
  moduleTests: state.ModuleReducer.moduleTests,
  loadingMaterial: state.ModuleReducer.loadingMaterial,
  loadingTests: state.ModuleReducer.loadingTests,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseDetail);
