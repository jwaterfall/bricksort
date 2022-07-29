import { FC, PropsWithChildren } from 'react';

import { useDropdown } from './';

export const DropdownToggle: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { toggleIsOpen, reference } = useDropdown();

  return (
    <div onClick={toggleIsOpen} ref={reference}>
      {children}
    </div>
  );
};
