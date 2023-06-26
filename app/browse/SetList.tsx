'use client';

import { FC } from 'react';

import { GetSetsOptions } from '@/utils/data/sets';
import { PaginatedResult } from '@/utils/pagination';
import { useInfinitePaginatedItems, useInfiniteScrolling } from '@/utils/infiniteScrolling';
import { Set } from '@/models/Set';
import { SetCard } from './SetCard';

interface SetListProps {
    initialData: PaginatedResult<Set>;
    options: GetSetsOptions;
}

export const SetList: FC<SetListProps> = ({ initialData, options }) => {
    const { items: sets, fetchNextPage } = useInfinitePaginatedItems('/api/sets', initialData, options);
    const ref = useInfiniteScrolling(fetchNextPage);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-4 mb-4">
            {sets?.map((set) => (
                <SetCard key={set.id} set={set} />
            ))}
            <div ref={ref} />
        </div>
    );
}; 

