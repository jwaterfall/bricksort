import styled from 'styled-components';

import { ButtonSize } from '.';

export const PrimaryButton = styled.button<{
  size?: ButtonSize;
  isFullWidth?: boolean;
}>`
  margin: 0;
  color: ${({ theme }) => theme.colors.button.text};
  background: ${({ theme }) => theme.colors.button.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: ${({ theme }) => theme.font.weight.medium};
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
    background: ${({ theme }) => theme.colors.button.backgroundHover};
    cursor: pointer;
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.button.textDisabled};
    background: ${({ theme }) => theme.colors.button.backgroundDisabled};
  }
`;
