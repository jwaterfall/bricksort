import { Dispatch, FC, PropsWithChildren, SetStateAction, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export const ModalTitle: FC<PropsWithChildren> = ({ children }) => <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{children}</h3>;
export const ModalBody: FC<PropsWithChildren> = ({ children }) => <p className="py-4 text-zinc-800 dark:text-zinc-100">{children}</p>;
export const ModalFooter: FC<PropsWithChildren> = ({ children }) => <div className="mt-6 flex justify-end">{children}</div>;

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  closeOnOutsideClick?: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ isOpen = false, setIsOpen, children, closeOnOutsideClick = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    if (closeOnOutsideClick) {
      setIsOpen(false);
    }
  });

  return (
    <div
      className={`bg-black/20 transition-opacity duration-300 fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-end md:items-center md:p-4 ${
        isOpen ? '' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        ref={ref}
        className={`bg-zinc-50 p-4 border border-zinc-300 rounded-md w-full md:max-w-lg shadow-md transition-transform duration-300 dark:bg-zinc-800 dark:border-zinc-700 ${
          isOpen ? '' : 'scale-75'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
