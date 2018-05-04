import styled from 'styled-components';
import { Edit } from 'material-ui-icons';
import Button from 'material-ui/Button';

export const StyledButton = styled(Button)`
  && {
    padding: 0;
    font-size: 100%;
    font-weight: 400;
    min-width: 55px;
    top: 40%;
    left: 40%;
  }
`;

export const StyledEdit = styled(Edit)`
  && {
    color: #fdde83;
  }
`;
