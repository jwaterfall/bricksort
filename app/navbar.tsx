'use client';

import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, LucideIcon, User, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarItemProps {
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NavbarItem: FC<PropsWithChildren<NavbarItemProps>> = ({
  href,
  icon: Icon,
  exact = false,
  children,
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center gap-2 py-2',
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
      )}
    >
      <Icon size={20} />
      <span className="text-xs font-medium">{children}</span>
    </Link>
  );
};

export const Navbar = () => {
  return (
    <nav className="grid grid-cols-4 border-t">
      <NavbarItem href="/" icon={Home} exact>
        Home
      </NavbarItem>
      <NavbarItem href="/browse" icon={Search}>
        Browse
      </NavbarItem>
      <NavbarItem href="/collection" icon={Folder}>
        Collection
      </NavbarItem>
      <NavbarItem href="/profile" icon={User}>
        Profile
      </NavbarItem>
    </nav>
  );
};
