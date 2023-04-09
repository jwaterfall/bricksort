import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ExtendedCollectionInventoryPart } from '../models/CollectionInventoryPart';

interface SetResponse {
  collectionInventoryParts: ExtendedCollectionInventoryPart[];
  pageCount: number;
}

export const getCollectionInventoryParts = async (id: string, page?: number, limit?: number, isForMinifig?: boolean) => {
  const response = await axios.get(`${window.location.origin}/api/collection/inventories/${id}/parts`, {
    params: { page, limit, isForMinifig },
  });

  return response.data;
};

const useCollectionInventoryParts = (id: string, page?: number, limit?: number, isForMinifig?: boolean) =>
  useQuery<SetResponse>(
    ['collectionInventoryParts', id, page, limit, isForMinifig],
    () => getCollectionInventoryParts(id, page, limit, isForMinifig),
    {
      keepPreviousData: true,
    }
  );

export default useCollectionInventoryParts;
