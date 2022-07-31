import styled from 'styled-components';

export const PrimaryInput = styled.input<{ fullWidth?: boolean }>`
  outline: 0;
  border: 0.025rem solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.foreground};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  padding: 0 1rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 150ms;
  ${(props) => props.fullWidth && 'width: 100%;'};
  &,
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  &:focus {
    color: ${({ theme }) => theme.colors.text};
  }
`;
