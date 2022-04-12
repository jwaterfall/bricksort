import styled from 'styled-components';

export const Container = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 105;
  background: hsla(0, 0%, 0%, 0.5);
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  max-height: 100%;
  min-width: 35rem;
  padding: 2rem;
  border-radius: 0.25rem;
  background: ${(props) => props.theme.foreground};
  box-shadow: 0 0 1rem 0.5rem #00000015;
`;

export const Footer = styled.div`
  width: 100%;
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
