import styled from 'styled-components';

import { ButtonSize } from '.';

export const PrimaryButton = styled.button<{
  size?: ButtonSize;
  isFullWidth?: boolean;
}>`
  margin: 0;
  color: ${(props) => props.theme.buttonText};
  background: ${(props) => props.theme.primary};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: ${(props) => props.theme.fontWeightMedium};
  text-decoration: none;
  transition: all 150ms;
  padding: 0 2rem;
  border: none;
  text-transform: capitalize;
  ${({ size }) =>
    size === 'sm' &&
    `
    height: 2rem;
    font-size: 0.75rem;
    padding: 0 1rem;
  `}
  ${({ size }) =>
    size === 'md' &&
    `
    height: 3rem;
    font-size: 0.9rem;
    padding: 0 2rem;
  `}
  ${({ size }) =>
    size === 'lg' &&
    `
    height: 3.5rem;
    font-size: 1rem;
    padding: 0 2.5rem;
  `}
  ${({ isFullWidth }) => isFullWidth && 'width: 100%;'};
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonHover};
    cursor: pointer;
  }
  &:disabled {
    color: ${(props) => props.theme.buttonTextDisabled};
    background: ${(props) => props.theme.buttonDisabled};
  }
`;
