import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Edit, Delete } from 'material-ui-icons';

import Button from '../Button';

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const QuotesLink = styled(Link)`
  background-color: #ffdd47;
  padding: 5px 10px;
  border-radius: 50px;
`;

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

export const StyledDelete = styled(Delete)`
  && {
    color: #7ee6b3  ;
  }
`;

export const TableWrapper = styled.div``;

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
`;

export const FilterItem = styled.div`
  margin-right: 15px;
`;
