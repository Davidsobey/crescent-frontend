import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { Divider } from 'material-ui';

import Card from '../../../Components/Card';
import history from '../../../Helpers/History';
import Button from '../../../Components/Button';

class CourseDetail extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { course, modules, material } = this.props;
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
            <Divider />
            <br />
            {modules && (
              <div>
                <Typography variant="headline" component="h2">
                  Course Related Modules
                </Typography>
                {modules.map(module => (
                  <ExpansionPanel
                    expanded={expanded === module.id}
                    onChange={this.handleChange(module.id)}
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
                            `https://crescenttesting.azurewebsites.net/ModuleMaterial/${material.fileName}`,
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
  modules: PropTypes.object,
  material: PropTypes.object,
};

const mapStateToProps = state => ({
  course: state.CourseReducer.course,
  modules: state.ModuleReducer.modules,
  material: state.ModuleReducer.modulematerial,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
