import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export const TableWrapper = styled.div``;

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
`;

export const FilterItem = styled.div`
  margin-right: 15px;
`;
