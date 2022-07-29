import styled from 'styled-components';

import { AlertType } from '.';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 0.75rem;
  padding: 1rem;
  pointer-events: none;
  overflow: hidden;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const AlertCardContainer = styled.div<{ type: AlertType }>`
  flex-shrink: 0;
  pointer-events: auto;
  position: relative;
  width: 20rem;
  max-width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  background-color: ${({ theme, type }) => theme.colors.alerts[type]};
  box-shadow: 0 0.5rem 1rem ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.colors.alerts.text};
  & > svg {
    height: 1.25rem;
    width: 1.25rem;
  }
  & > svg:last-of-type {
    margin-left: auto;
    transition: all 150ms;
    height: 1rem;
    width: 1rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const ProgressBar = styled.div<{ timeout: number }>`
  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0;
    }
  }

  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.25rem;
  background: ${({ theme }) => theme.colors.alerts.progressBar};
  animation: linear progress ${(props) => props.timeout}ms;
`;
