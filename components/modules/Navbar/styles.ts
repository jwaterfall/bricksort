import styled from 'styled-components';

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
    padding: 1rem;
    flex-direction: row;
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
  color: ${({ theme }) => theme.navbarIcon};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    color: ${({ theme }) => theme.navbarIconHover};
  }
  & > svg {
    width: 1.75rem;
    height: 1.75rem;
  }
  &.active {
    color: ${({ theme }) => theme.navbarIconHover};
  }
  @media (max-width: 992px) {
    width: 4rem;
    height: auto;
  }
`;
