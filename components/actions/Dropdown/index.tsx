import { FC, PropsWithChildren } from 'react';

export const DropdownToggle: FC<PropsWithChildren> = ({ children }) => <label className="block w-fit">{children}</label>;

export const DropdownContent: FC<PropsWithChildren> = ({ children }) => (
  <div
    className="absolute pt-2 z-20 transition-all duration-200 hidden 
  group-[.start]:left-0 group-[.end]:right-0 group-[.hover:hover]:block 
  group-[.click:focus]:block group-[.click:focus-within]:block group-[.hover]:z-30 "
  >
    {children}
  </div>
);

interface DropdownProps {
  align?: 'start' | 'end';
  hover?: boolean;
}

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({ align = 'start', hover = false, children }) => (
  <div tabIndex={0} className={`relative w-fit group ${align} ${hover ? 'hover' : 'click'}`}>
    {children}
  </div>
);

export default Dropdown;
