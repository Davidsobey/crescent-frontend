import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import UserActions from '../../Actions/UserActions';

class CustomSnackbar extends React.Component {
  

  handleClose = () => {
    this.props.dispatch(UserActions.close());
  };

  render() {
    return (
      <Snackbar
        open={this.props.open}
        onClose={this.handleClose}
        direction="up"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">
            {typeof this.props.alert === 'string' && this.props.alert}
          </span>
        }
      />
    );
  }
}

CustomSnackbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.bool,
  alert: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    alert: state.AlertReducer.message,
    open: state.AlertReducer.open,
  };
}
export default connect(mapStateToProps)(CustomSnackbar);
