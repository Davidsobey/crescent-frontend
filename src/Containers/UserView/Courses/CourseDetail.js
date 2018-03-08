import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { LinearProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import history from '../../../Helpers/History';
import Button from '../../../Components/Button';
import ModuleActions from '../../../Actions/ModuleActions';

class CourseDetail extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = module => (event, expanded) => {
    this.setState({
      expanded: expanded ? module.id : false,
    });
    this.props.dispatch(ModuleActions.moduleMaterial(module.moduleMaterialIds));
  };

  render() {
    const { course, modules } = this.props;
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
                      <Typography>{module.description}</Typography>
                      <Button
                        color="secondary"
                        onClick={() => {
                          window.open(
                            'https://crescenttesting.azurewebsites.net/ModuleMaterial/1.pdf',
                            '_blank',
                          );
                        }}
                      >
                        Download Course Content
                      </Button>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </div>
            ) : (
              <div className="center">
                <LinearProgress color="secondary" />
                Loading Courses
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
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  course: state.CourseReducer.course,
  modules: state.ModuleReducer.modules,
  loading: state.ModuleReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
