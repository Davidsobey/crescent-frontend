import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

const StyledFormControl = styled.div`
  & div {
    width: 200px;
  }
`;

function ThemedSelect({
  label,
  input: { name, value, onChange },
  meta: { touched, error, warning },
  children,
  className,
}) {
  const errors = touched && (error || warning);
  return (
    <FormControl className={className} error={errors}>
      <StyledFormControl>
        <InputLabel htmlFor={name}>{label || name}</InputLabel>
        <Select value={value} onChange={onChange} input={<Input id={name} />}>
          {children}
        </Select>
        {errors && <FormHelperText>{error || warning}</FormHelperText>}
      </StyledFormControl>
    </FormControl>
  );
}

ThemedSelect.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.array,
  className: PropTypes.object,
};

export default ThemedSelect;
