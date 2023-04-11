import { FC, PropsWithChildren, useState, useContext, createContext, SetStateAction, Dispatch, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { ButtonProps } from './Button';

interface DropdownContext {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContext>({
    open: false,
    setOpen: () => {},
});

export const useDropdown = () => useContext(DropdownContext);

export const DropdownToggle: FC<ButtonProps> = ({ children }) => {
    const { setOpen } = useContext(DropdownContext);

    return (
        <button className="block" onClick={() => setOpen((open) => !open)}>
            {children}
        </button>
    );
};

interface DropdownContentProps {
    align?: 'left' | 'right';
}

export const DropdownContent: FC<PropsWithChildren<DropdownContentProps>> = ({ align = 'right', children }) => {
    const { open } = useContext(DropdownContext);

    return (
        <div
            className={`absolute z-20 transition-all duration-200 ${align === 'left' ? 'left-0' : 'right-0'}
        ${open ? '' : 'opacity-0 pointer-events-none -translate-y-2'}
    `}
        >
            {children}
        </div>
    );
};

const Dropdown: FC<PropsWithChildren> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setOpen(false));

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div ref={ref} className="relative">
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

export default Dropdown;
