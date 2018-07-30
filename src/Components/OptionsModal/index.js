import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography } from 'material-ui';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import ModalPaper from './styles';
import Button from '../Button';

class OptionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const style = {
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        style={style}
      >
        <ModalPaper>
          <Typography variant="title" id="modal-title">
            {this.props.title}
          </Typography>
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Select an option
            </FormLabel>
            <RadioGroup
              aria-label="select an option"
              name="option"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.props.options.map((option, index) => (
                <FormControlLabel
                  value={`${index}`}
                  control={<Radio />}
                  label={option.label}
                  key={index}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <br />
          <div className="justify-content flex-container">
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.props.onClick(this.state.value)}
            >
              Continue
            </Button>
          </div>
        </ModalPaper>
      </Modal>
    );
  }
}

OptionsModal.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  open: PropTypes.bool,
  options: PropTypes.array,
};

export default OptionsModal;
