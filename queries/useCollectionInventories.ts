import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { CollectionInventory } from '../models/CollectionInventory';

interface PaginationResponse {
    items: CollectionInventory[];
    pageCount: number;
}

export const getCollectionInventories = async (page?: number, limit?: number) => {
    const response = await axios.get(`${window.location.origin}/api/collection/inventories`, {
        params: { page, limit },
    });

    return response.data;
};

const useCollectionInventories = (limit?: number) =>
    useInfiniteQuery<PaginationResponse>(
        ['collectionInventories', limit], ({ pageParam = 1 }) => getCollectionInventories(pageParam, limit), {
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => lastPage.pageCount > allPages.length ? allPages.length + 1 : undefined
    });

export default useCollectionInventories;
