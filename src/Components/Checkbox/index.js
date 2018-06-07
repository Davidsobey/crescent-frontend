import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'redux-form-material-ui';
import PropTypes from 'prop-types';

const CheckboxWrapper = styled.div`
  & input {
    width: 400px;
  }
`;

function ThemedCheckbox({ theme, ...rest }) {
  return (
    <CheckboxWrapper>
      <Checkbox {...rest} />
    </CheckboxWrapper>
  );
}

ThemedCheckbox.propTypes = {
  theme: PropTypes.object,
};
export default ThemedCheckbox;
