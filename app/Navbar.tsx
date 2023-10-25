'use client';

import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { HiArchive, HiCollection, HiHome } from 'react-icons/hi';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavbarLinkProps {
  href: string;
  icon: IconType;
  exact?: boolean;
}

const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = ({ href, icon: Icon, children, exact = false }) => {
  const pathName = usePathname();
  const active = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

  return (
    <Link
      href={href}
      className={`text-xs rounded-full h-8 px-3 flex font-medium items-center border whitespace-nowrap transition-all duration-75 ${
        active ? 'bg-accent border-accent' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <Icon size={16} className={`mr-1.5 ${active ? 'text-primary' : ''}`} />
      {children}
    </Link>
  );
};

const Navbar: FC = () => {
  const { user } = useUser();

  return (
    <header className="my-4 flex items-center justify-between">
      <Link className="basis-1/4 flex items-center gap-2 text-2xl font-logo" href="/">
        <Image src="/logo.png" alt="logo" width={32} height={32} className="hidden sm:block" />
        <span>Bricksort</span>
      </Link>
      <nav className="flex items-center gap-2">
        <NavbarLink icon={HiHome} href="/" exact>
          Home
        </NavbarLink>
        <NavbarLink icon={HiCollection} href="/browse">
          Browse
        </NavbarLink>
        <NavbarLink icon={HiArchive} href="/collection">
          Collection
        </NavbarLink>
      </nav>
      <div className="basis-1/4 flex justify-end items-center gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.picture ?? undefined} />
              <AvatarFallback />
            </Avatar>
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
    </header>
  );
};

export default Navbar;
