import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography } from 'material-ui';
import ModalPaper from './styles';

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
  }

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadRows = (obj, arr) => {
    if (obj) {
      Object.keys(obj).forEach((prop) => {
        if (obj[prop] && !Array.isArray(obj[prop])) {
          arr.push(obj[prop]);
        }
      });
    }
    return arr;
  };

  render() {
    const style = {
      justifyContent: 'center',
      alignItems: 'center',
    };
    const { del, obj } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        style={style}
      >
        <ModalPaper>
          <Typography variant="title" id="modal-title">
            {`Are you sure you want to delete this ${del}?`}
          </Typography>
          {this.loadRows(obj, []).map(returnObj => (
            <Typography
              key={returnObj}
              variant="subheading"
              id="simple-modal-description"
            >
              {returnObj}
            </Typography>
          ))}
        </ModalPaper>
      </Modal>
    );
  }
}

CustomModal.propTypes = {
  del: PropTypes.string,
  obj: PropTypes.object,
  onRef: PropTypes.func,
};

export default CustomModal;
