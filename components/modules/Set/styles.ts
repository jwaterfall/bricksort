import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 1rem;
  border: 0.125rem solid ${(props) => props.theme.primary};
  margin: 1rem;
  background: ${(props) => props.theme.foreground};
`;

export const Image = styled.img`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
  width: 15rem;
  border-radius: 0.25rem;
`;
