import styled from 'styled-components';

export const HideOnMobile = styled.div`
  width: 100%;
  @media (max-width: 992px) {
    display: none;
  }
`;

export const Container = styled.div`
  grid-area: navbar;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.navbar};
  width: 6rem;
  padding: 1.5rem;
  gap: 1rem;
  box-shadow: 0 0 0.75rem 0.075rem ${({ theme }) => theme.shadow};
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 992px) {
    width: 100%;
    flex-direction: row;
  }
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 100%;
  color: ${({ theme }) => theme.textSecondary};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    color: ${({ theme }) => theme.text};
  }
  & > svg {
    width: 1.75rem;
    height: 1.75rem;
  }
  &.active {
    color: ${({ theme }) => theme.text};
  }
  @media (max-width: 992px) {
    width: 4rem;
    height: auto;
  }
`;

export const AccountButton = styled.button`
  width: 3rem;
  height: 3rem;
  padding: 0.75rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  border: none;
  box-shadow: 0 0 0.75rem 0.125rem ${({ theme }) => theme.shadow};
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
