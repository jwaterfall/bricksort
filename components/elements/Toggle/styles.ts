import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ToggleContainer = styled.div<{ toggled?: boolean }>`
  width: 3.5rem;
  height: 2rem;
  border-radius: 1rem;
  border: 0.125rem solid
    ${(props) => (props.toggled ? props.theme.primary : props.theme.secondary)};
  margin: 1rem;
  transition: all 150ms;
  cursor: pointer;
`;

export const Thumb = styled.div<{ toggled?: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.125rem;
  border-radius: 1rem;
  margin-left: ${(props) => (props.toggled ? '1.5rem' : '0.125rem')};
  background: ${(props) =>
    props.toggled ? props.theme.primary : props.theme.secondary};
`;
