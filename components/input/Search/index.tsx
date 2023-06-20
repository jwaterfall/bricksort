import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { MdSearch } from 'react-icons/md';

import { IconButton } from '@/components/actions/IconButton';

interface SearchProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onSubmit'> {
    onSubmit: (search?: string) => void;
    value?: string;
}

export const Search: FC<SearchProps> = ({ onSubmit, ...props }) => (
    <form
        className="h-14 flex gap-4 px-4 items-center rounded-full dark:bg-zinc-800"
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit(props.value);
        }}
    >
        <input {...props} className="flex-1 bg-transparent outline-none" />
        <IconButton icon={MdSearch} variant="text" />
    </form>
);
