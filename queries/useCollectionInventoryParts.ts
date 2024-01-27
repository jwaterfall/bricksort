import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { CollectionInventoryPart } from '../models/CollectionInventoryPart';

interface PaginationResponse {
  items: CollectionInventoryPart[];
  pageCount: number;
}

export const getCollectionInventoryParts = async (id: string, page?: number, limit?: number, isMissing?: boolean) => {
  const response = await axios.get(`${window.location.origin}/api/collection/inventories/${id}/parts`, {
    params: { page, limit, type: isMissing ? 'missing' : 'found' },
  });

  return response.data;
};

const useCollectionInventoryParts = (id: string, limit?: number, isMissing?: boolean) =>
  useInfiniteQuery<PaginationResponse>(
    ['collectionInventoryParts', id, limit, isMissing],
    ({ pageParam = 1 }) => getCollectionInventoryParts(id, pageParam, limit, isMissing),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => (lastPage.pageCount > allPages.length ? allPages.length + 1 : undefined),
    }
  );

export default useCollectionInventoryParts;
