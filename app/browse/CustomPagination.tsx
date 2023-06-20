'use client';

import { FC } from 'react';

import { Pagination } from '@/components/navigation/Pagination';
import { useSetSearchParam } from '@/utils/searchParams';

interface CustomPaginationProps {
    page: number;
    pageCount: number;
}

export const CustomPagination: FC<CustomPaginationProps> = (props) => {
    const setSearchParam = useSetSearchParam();

    function onChange(page: number) {
        setSearchParam('page', page);
    }

    return <Pagination {...props} onChange={onChange} />;
};
