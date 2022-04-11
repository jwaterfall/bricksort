import styled from 'styled-components';

export const PrimaryButton = styled.button<{
  isFullWidth?: boolean;
}>`
  margin: 0;
  color: ${(props) => props.theme.primary};
  background: none;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: ${(props) => props.theme.fontWeightBold};
  text-decoration: none;
  cursor: pointer;
  transition: all 150ms;
  ${(props) => props.isFullWidth && 'width: 100%;'};
  &:hover {
    background: ${(props) => props.theme.buttonPrimaryHover};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  color: ${(props) => props.theme.primary};
  border-color: ${(props) => props.theme.primary};
  &:hover {
    background: ${(props) => props.theme.buttonPrimaryHover};
  }
`;
