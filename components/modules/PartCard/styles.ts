import styled from 'styled-components';

export const Container = styled.div<{
  variant: 'primary' | 'secondary' | 'tertiary';
}>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border: 0.125rem solid ${(props) => props.theme[props.variant]};
  background: ${(props) => props.theme.foreground};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: 0 0 0.75rem 0.075rem ${({ theme }) => theme.shadow};
`;

export const Image = styled.img`
  max-width: 10rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius};
  margin: 0 auto;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
