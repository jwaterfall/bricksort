'use client';

import { FC } from 'react';

import { GetCollectionInventoriesOptions } from '@/utils/data/collectionInventories';
import { PaginatedResult } from '@/utils/pagination';
import { useInfinitePaginatedItems, useInfiniteScrolling } from '@/utils/infiniteScrolling';
import { CollectionInventory } from '@/models/CollectionInventory';
import { CollectionInventoryCard } from './CollectionInventoryCard';

interface CollectionInventoryListProps {
    initialData: PaginatedResult<CollectionInventory>;
    options: GetCollectionInventoriesOptions;
}

export const CollectionInventoryList: FC<CollectionInventoryListProps> = ({ initialData, options }) => {
    const { items: collectioninventories, fetchNextPage } = useInfinitePaginatedItems('/api/collection-inventories', initialData, options);
    const ref = useInfiniteScrolling(fetchNextPage);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-4 mb-4">
            {collectioninventories?.map((collectioninventory) => (
                <CollectionInventoryCard key={collectioninventory.id} collectioninventory={collectioninventory} />
            ))}
            <div ref={ref} />
        </div>
    );
};
