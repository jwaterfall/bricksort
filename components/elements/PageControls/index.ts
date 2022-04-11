import styled from 'styled-components';

export const PageControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: ${(props) => props.theme.background};
  position: sticky;
  border-bottom: 0.025rem solid ${(props) => props.theme.scrollbarThumb};
  top: 0;
`;

export const PageNumber = styled.div`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  user-select: none;
`;

export const PageButton = styled.button`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.text};
  }
  &:disabled {
    opacity: 0.4;
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.text};
    cursor: default;
  }
`;
