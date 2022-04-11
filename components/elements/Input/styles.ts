import styled from 'styled-components';

export const PrimaryInput = styled.input<{ fullWidth?: boolean }>`
  outline: 0;
  border: 0.025rem solid ${(props) => props.theme.primary};
  background: ${(props) => props.theme.foreground};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.weightBold};
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  transition: all 150ms;
  ${(props) => props.fullWidth && 'width: 100%;'};
  &,
  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
  }
  &:focus {
    color: ${(props) => props.theme.text};
  }
`;

export const SecondaryInput = styled(PrimaryInput)`
  border-color: ${(props) => props.theme.secondary};
`;

export const TertiaryInput = styled(PrimaryInput)`
  border-color: ${(props) => props.theme.tertiary};
`;
