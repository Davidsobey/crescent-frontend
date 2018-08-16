// do a file upload
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import Select from '../../../../Components/Select';
import Card from '../../../../Components/Card';
import Button from '../../../../Components/Button';
import ClientActions from '../../../../Actions/ClientActions';
import ModuleActions from '../../../../Actions/ModuleActions';
import CourseActions from '../../../../Actions/CourseActions';
import LinearProgress from '../../../../Components/LinearProgress';
import OptionsModal from '../../../../Components/OptionsModal';
import history from '../../../../Helpers/History';

const validate = () => {
  const errors = {};

  return errors;
};

const options = [
  {label: 'Create another module', url: '/module/create'},
  {label: 'Create an assignment for this module', url: '/assessment/create'},
  {label: 'Upload another material for this module'},
  {label: 'Enrol a user in this course', url: '/user/enrol'},
];

class MaterialCreate extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount () {
    if (this.props.newModuleId) {
      const newModuleId = this.props.newModuleId;
      this.props.initialize({ ModuleId: newModuleId });
    }
    this.props.dispatch(ModuleActions.getAll());
    this.props.dispatch(CourseActions.getAllUnsubscribed(this.props.user.clientId));
  }

  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  submit = (values) => {
    let courseID = (Array.isArray(this.props.modules) ? this.props.modules : []).find(module => module.id == values.ModuleId).courseId;
    let clientID = this.props.user.clientId;
    if ((Array.isArray(this.props.unsubscribed_courses) ? this.props.unsubscribed_courses : []).find(course => course.id == courseID)) {
      const subscription = Object.assign({}, {courseID, clientID});
      this.props.dispatch(ClientActions.subscribeSilent(subscription));
    }

    const file = this.state.selectedFile;
    this.props.dispatch(ModuleActions.uploadMaterial(values.ModuleId, file));
  };
  
  onContinue = (index) => {
    this.props.dispatch(ModuleActions.closeRedirectModal());
    if (index==2)
      this.props.initialize({ ModuleId: this.props.newModuleId });
    else
      history.push(options[index].url);
  }

  render() {
    return (
      <Card width="600px" title="Create New Material">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.modules_loading || this.props.unsubscribed_courses_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Modules...
                </div>
              ) : (
                <Field name="ModuleId" label="Module Name" component={Select}>
                  {(Array.isArray(this.props.modules) ? this.props.modules : [])
                  .map(module => (
                    <MenuItem value={module.id} key={module.id}>
                      {module.name}
                    </MenuItem>
                  ))}
                </Field>
              )}
              <div>
                <input type="file" onChange={this.fileSelectedHandler} />
              </div>
            </div>
          </div>
          {this.props.uploading || this.props.client_subscribing ? (
            <div style={{width: '400px'}}>
              <LinearProgress color="secondary" />
              Creating Material
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Material
              </Button>
            </div>
          )}
        </form>
        <OptionsModal
          title="Module created successfully."
          open={this.props.openRedirectModal && !this.props.client_subscribing ? this.props.openRedirectModal:false}
          onClick={this.onContinue.bind(this)}
          options={options}
        />
      </Card>
    );
  }
}

MaterialCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  unsubscribed_courses: PropTypes.array,
  unsubscribed_courses_loading: PropTypes.bool,
  modules: PropTypes.array,
  modules_loading: PropTypes.bool,
  newModuleId: PropTypes.number,
  uploading: PropTypes.bool,
  client_subscribing: PropTypes.bool,
  openRedirectModal: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  unsubscribed_courses: state.CourseReducer.unsubscribed_courses,
  unsubscribed_courses_loading: state.CourseReducer.unsubscribed_courses_loading,
  modules: state.ModuleReducer.modules,
  modules_loading: state.ModuleReducer.loading,
  newModuleId: state.ModuleReducer.newModuleId,
  uploading: state.ModuleReducer.uploading,
  client_subscribing: state.ClientReducer.subscribing,
  openRedirectModal: state.ModuleReducer.openRedirectModal,
  user: state.LoginReducer.user,
});

const withForm = reduxForm(
  {
    form: 'materialCreate',
    validate,
  },
  MaterialCreate,
);

export default compose(connect(mapStateToProps), withForm)(MaterialCreate);
