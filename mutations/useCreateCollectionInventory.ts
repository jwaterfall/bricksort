import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { CollectionInventory } from '../models/CollectionInventory';

async function createCollectionInventory(setId: string) {
  const { origin } = window.location;
  const response = await axios.post<CollectionInventory>(`${origin}/api/collection/inventories/${setId}`);

  const createdSet = response.data;
  return createdSet;
}

function useCreateCollectionInventory() {
  const queryClient = useQueryClient();

  return useMutation((setId: string) => createCollectionInventory(setId), {
    onSuccess: () => queryClient.invalidateQueries(['collectionInventories']),
  });
}

export default useCreateCollectionInventory;