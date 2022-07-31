import styled from 'styled-components';

export const AccountButton = styled.button`
  width: 3rem;
  height: 3rem;
  padding: 0.75rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.button.background};
  border: none;
  box-shadow: 0 0 0.75rem 0.125rem ${({ theme }) => theme.colors.shadow};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    background: ${({ theme }) => theme.colors.button.backgroundHover};
    cursor: pointer;
    transform: scale(1.05);
  }
`;
