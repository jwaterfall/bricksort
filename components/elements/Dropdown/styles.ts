import { Strategy } from '@floating-ui/react-dom';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Menu = styled.div<{
  position: Strategy;
  x: number;
  y: number;
}>`
  z-index: 99;
  position: ${({ position }) => position};
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  min-width: 15rem;
  max-width: 25rem;
  max-height: 25rem;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.colors.foreground};
  box-shadow: 0 0 0.75rem 0.075rem ${({ theme }) => theme.colors.shadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.5rem;
`;

export const Item = styled.button.attrs({ type: 'button' })`
  width: 100%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: color 150ms, background-color 150ms;
  background: none;
  border: none;
  outline: none;
  overflow: hidden;
  &:hover {
    background: ${({ theme }) => theme.colors.overlay};
    color: ${({ theme }) => theme.colors.text};
    & > svg {
      fill: ${({ theme }) => theme.colors.text};
    }
  }
  & > svg {
    transition: fill 150ms;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

export const Divider = styled.hr`
  margin: 0.5rem;
  background-color: ${({ theme }) => theme.colors.overlay};
  border: none;
  height: 1px;
`;
