import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { CollectionInventory } from '../models/CollectionInventory';

async function deleteCollectionInventory(id: string) {
  const { origin } = window.location;
  const response = await axios.delete<CollectionInventory>(
    `${origin}/api/collection/inventories/${id}`
  );

  const deletedSet = response.data;
  return deletedSet;
}

function useDeleteCollectionInventory() {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteCollectionInventory(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['collectionInventories']);
      toast('Removed from collection', {
        description: 'You will no longer see this set in your collection',
      });
    },
    onError: () => {
      toast('Error removing from collection', {
        description:
          'There was an error removing this set from your collection',
      });
    },
  });
}

export default useDeleteCollectionInventory;
