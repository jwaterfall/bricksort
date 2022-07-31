import styled from 'styled-components';

export const ToggleContainer = styled.div<{ toggled?: boolean }>`
  width: 3.5rem;
  height: 2rem;
  border-radius: 1rem;
  border: 0.125rem solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const Thumb = styled.div<{ toggled?: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.125rem;
  border-radius: 1rem;
  margin-left: ${({ toggled }) => (toggled ? '1.5rem' : '0.125rem')};
  transition: ${({ theme }) => theme.transition};
  background: ${({ theme }) => theme.colors.primary};
`;
