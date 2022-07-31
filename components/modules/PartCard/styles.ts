import styled from 'styled-components';

export const Container = styled.div<{
  variant: 'red' | 'amber' | 'green';
}>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border: 0.125rem solid ${({ theme, variant }) => theme.colors[variant]};
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.75rem 0.075rem ${({ theme }) => theme.colors.shadow};
`;

export const Image = styled.img`
  max-width: 10rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 0 auto;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
