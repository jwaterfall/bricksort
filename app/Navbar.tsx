'use client';

import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import { LucideIcon, Home, Blocks, Bookmark, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarLinkProps {
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = ({
  href,
  icon: Icon,
  children,
  exact = false,
}) => {
  const pathName = usePathname();
  const active = pathName
    ? exact
      ? pathName === href
      : pathName.startsWith(href)
    : false;

  return (
    <Link
      href={href}
      className={`h-16 px-6 text-sm flex gap-2 items-center font-medium transition-all duration-75 ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <Icon size={22} />
      {children}
    </Link>
  );
};

const Navbar: FC = () => (
  <header className="border-b">
    <div className="container px-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold tracking-tighter flex gap-2 items-center">
        <Image
          src="/logo.png"
          alt="Bricksort"
          width={32}
          height={32}
        />
        Bricksort
      </Link>
      <nav className="flex divide-x border-x">
        <NavbarLink icon={Home} href="/" exact>
          Home
        </NavbarLink>
        <NavbarLink icon={Search} href="/browse" exact>
          Browse
        </NavbarLink>
        <NavbarLink icon={Blocks} href="/collection">
          Collection
        </NavbarLink>
        <NavbarLink icon={Bookmark} href="/wishlist">
          Wishlist
        </NavbarLink>
      </nav>
    </div>
  </header>
);

export default Navbar;
