import styled from 'styled-components';

export const PrimaryInput = styled.input<{ fullWidth?: boolean }>`
  outline: 0;
  border: 0.025rem solid ${(props) => props.theme.primary};
  background: ${(props) => props.theme.foreground};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeightMedium};
  padding: 0 1rem;
  height: 3rem;
  border-radius: ${(props) => props.theme.borderRadius};
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
