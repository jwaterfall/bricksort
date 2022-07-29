import { VirtualElement } from '@floating-ui/core';
import { Strategy, autoPlacement, offset, shift, useFloating } from '@floating-ui/react-dom';
import React, { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext } from 'react';

import useBoolean from '@/hooks/useBoolean';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import { Container, Divider, Item } from './styles';

export const DropdownItem = Item;
export const DropdownDivider = Divider;
export * from './Menu';
export * from './Toggle';

interface DropdownContextValue {
  isOpen: boolean;
  toggleIsOpen: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  x: number | null;
  y: number | null;
  reference: (node: Element | VirtualElement | null) => void;
  floating: (node: HTMLElement | null) => void;
  strategy: Strategy;
}

const DropdownContext = createContext<DropdownContextValue>({} as DropdownContextValue);

export const useDropdown = () => useContext(DropdownContext);

const DropdownWithoutProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { setIsOpen } = useDropdown();
  const ref = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return <Container ref={ref}>{children}</Container>;
};

const Dropdown: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, toggleIsOpen, setIsOpen] = useBoolean(false);

  const middleware = [
    autoPlacement({
      allowedPlacements: ['bottom', 'top'],
    }),
    offset(24),
    shift({ padding: 16 }),
  ];

  const { x, y, reference, floating, strategy } = useFloating({
    middleware,
  });

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggleIsOpen,
        setIsOpen,
        x,
        y,
        reference,
        floating,
        strategy,
      }}
    >
      <DropdownWithoutProvider>{children}</DropdownWithoutProvider>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
