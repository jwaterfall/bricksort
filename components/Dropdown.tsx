import { FC, PropsWithChildren } from 'react';

interface DropdownContentProps {
  align?: 'left' | 'right';
}

export const DropdownContent: FC<PropsWithChildren<DropdownContentProps>> = ({ align = 'right', children }) => (
  <div
    className={`pt-4 absolute z-20 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
      ${align === 'left' ? 'left-0' : 'right-0'}
    `}
  >
    {children}
  </div>
);

const Dropdown: FC<PropsWithChildren> = ({ children }) => <div className="relative group shrink-0">{children}</div>;

export default Dropdown;
