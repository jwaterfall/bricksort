'use client';

import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarLinkProps {
  href: string;
  exact?: boolean;
}

const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = ({ href, children, exact = false }) => {
  const pathName = usePathname();
  const active = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

  return (
    <Link
      href={href}
      className={`text-sm font-medium whitespace-nowrap transition-colors duration-75 ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-primary'
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar: FC = () => {
  const { user } = useUser();

  return (
    <div className="h-16 bg-background border-b">
      <div className="container h-full flex items-center justify-between">
        <Link className="basis-1/4 flex items-center gap-2 text-2xl font-lobster" href="/">
          <Image src="/logo.png" alt="logo" width={32} height={32} className="hidden sm:block" />
          <span>Bricksort</span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavbarLink href="/" exact>
            Home
          </NavbarLink>
          <NavbarLink href="/browse">Browse</NavbarLink>
          <NavbarLink href="/collection">Collection</NavbarLink>
        </nav>
        <div className="basis-1/4 flex justify-end items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={user?.picture ?? undefined}
                alt="user"
                className="w-10 aspect-square rounded-full flex-shrink-0 cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/api/auth/logout">Logout</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
