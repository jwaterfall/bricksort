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

export const StyledModal = styled.div`
  max-width: 100%;
  max-height: 100%;
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.colors.foreground};
  box-shadow: 0 0 1rem 0.5rem #00000015;
  overflow-y: auto;
  width: 30rem;
`;

export const Content = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  & > svg {
    transition: all 150ms;
    height: 1rem;
    width: 1rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
