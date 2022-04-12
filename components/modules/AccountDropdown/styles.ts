import styled from 'styled-components';

export const AccountButton = styled.button`
  width: 3rem;
  height: 3rem;
  padding: 0.75rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  border: none;
  box-shadow: 0 0 0.75rem 0.125rem ${({ theme }) => theme.shadow};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    cursor: pointer;
    transform: scale(1.05);
  }
`;
