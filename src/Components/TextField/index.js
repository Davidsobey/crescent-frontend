import React from 'react';
import styled from 'styled-components';
import { TextField } from 'redux-form-material-ui';
import PropTypes from 'prop-types';

const TextFieldWrapper = styled.div`
  & input {
    width: 400px;
  }
`;

function ThemedTextField({ theme, ...rest }) {
  return (
    <TextFieldWrapper>
      <TextField {...rest} />
    </TextFieldWrapper>
  );
}

ThemedTextField.propTypes = {
  theme: PropTypes.object,
};
export default ThemedTextField;
