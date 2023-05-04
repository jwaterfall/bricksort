import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import Menu, { MenuItem, MenuProps } from '@/components/navigation/Menu';
import Dropdown, { DropdownContent, DropdownToggle } from '@/components/actions/Dropdown';
import Button from '@/components/actions/Button';

interface SelectContext extends SelectProps {
  activeText: string;
  setActiveText: Dispatch<SetStateAction<string>>;
}

const SelectContext = createContext<SelectContext>({} as SelectContext);

interface SelectOptionProps {
  value: string;
  children: string;
}

export const SelectOption: FC<SelectOptionProps> = ({ value, children }) => {
  const { onChange, active, setActiveText } = useContext(SelectContext);

  useEffect(() => {
    if (active === value) setActiveText(children);
  }, [active, value, setActiveText, children]);

  return (
    <MenuItem active={active === value} onClick={() => onChange(value)}>
      {children}
    </MenuItem>
  );
};

interface SelectProps extends MenuProps {
  active: string;
  onChange: (value: string) => void;
}

const Select: FC<PropsWithChildren<SelectProps>> = ({ active, onChange, children, ...props }) => {
  const [activeText, setActiveText] = useState('None');

  return (
    <SelectContext.Provider value={{ active, onChange, activeText, setActiveText }}>
      <Dropdown>
        <DropdownToggle>
          <Button size={props.compact ? 'sm' : 'md'} EndIcon={FaChevronDown}>
            {activeText}
          </Button>
        </DropdownToggle>
        <DropdownContent>
          <Menu {...props}>{children}</Menu>
        </DropdownContent>
      </Dropdown>
    </SelectContext.Provider>
  );
};

export default Select;
