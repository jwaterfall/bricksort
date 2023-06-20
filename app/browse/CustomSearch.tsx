'use client';

import { FC, useState } from 'react';

import { Search } from '@/components/input/Search';
import { useSetSearchParam } from '@/utils/searchParams';

export const CustomSearch: FC = () => {
    const [search, setSearch] = useState<string>();
    const setSearchParam = useSetSearchParam();

    function onSubmit(search?: string) {
        setSearchParam('search', search || null);
    }

    return <Search value={search} onChange={(e) => setSearch(e.target.value)} onSubmit={onSubmit} />;
};
