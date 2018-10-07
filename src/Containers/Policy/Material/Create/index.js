// do a file upload
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';

import Select from '../../../../Components/Select';
import Card from '../../../../Components/Card';
import Button from '../../../../Components/Button';
import PolicyActions from '../../../../Actions/PolicyActions';
import LinearProgress from '../../../../Components/LinearProgress';

const validate = () => {
  const errors = {};
  return errors;
};
const required = value => (value ? undefined : 'Required');
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

class PolicyMaterialCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(PolicyActions.getAll());
  }

  componentWillMount() {
    this.props.initialize({ PolicyId: this.props.newPolicyId });
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
    const file = this.state.selectedFile;
    this.props.dispatch(PolicyActions.uploadMaterial(values.PolicyId, file));
  };

  render() {
    return (
      <Card width="600px" title="Create New Policy Material">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.policies_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Policies
                </div>
              ) : (
                <Field name="PolicyId" label="Policy Name" component={Select} validate={[required]}>
                  {(Array.isArray(this.props.policies) ? this.props.policies : [])
                  .map(policy => (
                    <MenuItem value={policy.id} key={policy.id}>
                      {policy.name}
                    </MenuItem>
                  ))}
                </Field>
              )}
              <div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={this.fileSelectedHandler}
                />
              </div>
            </div>
          </div>
          {this.props.material_creating ? (
            <div style={{ width: '400px' }}>
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
      </Card>
    );
  }
}

PolicyMaterialCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  policies: PropTypes.array,
  policies_loading: PropTypes.bool,
  newPolicyId: PropTypes.number,
  material_creating: PropTypes.bool,
};

const mapStateToProps = state => ({
  policies: state.PolicyReducer.policies,
  policies_loading: state.PolicyReducer.loading,
  newPolicyId: state.PolicyReducer.newPolicyId,
  material_creating: state.PolicyReducer.creating,
});

const withForm = reduxForm(
  {
    form: 'policyMaterialCreate',
    validate,
  },
  PolicyMaterialCreate,
);

export default compose(connect(mapStateToProps), withForm)(PolicyMaterialCreate);
