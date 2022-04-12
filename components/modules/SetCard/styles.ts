import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 1rem;
  margin: 1rem;
  background: ${(props) => props.theme.foreground};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: 0 0 0.75rem 0.075rem ${({ theme }) => theme.shadow};
`;

export const Image = styled.img`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
  width: 15rem;
  border-radius: ${(props) => props.theme.borderRadius};
`;
