'use client';

import { FC, PropsWithChildren } from 'react';
import { LucideIcon, Home, Blocks, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

interface NavbarLinkProps {
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = ({ href, icon: Icon, children, exact = false }) => {
  const pathName = usePathname();
  const active = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

  return (
    <Link
      href={href}
      className={`bg-surface h-full text-xs px-6 flex flex-col gap-1 items-center justify-center font-semibold whitespace-nowrap transition-all duration-75 ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <Icon size={24} />
      {children}
    </Link>
  );
};

const Navbar: FC = () => {
  const { user } = useUser();

  return (
    <nav className="h-16 border-t bg-surface rounded-t-lg grid grid-cols-3">
      <NavbarLink icon={Home} href="/" exact>
        Home
      </NavbarLink>
      <NavbarLink icon={Search} href="/browse">
        Browse
      </NavbarLink>
      <NavbarLink icon={Blocks} href="/collection">
        Collection
      </NavbarLink>
    </nav>
  );
};

export default Navbar;
