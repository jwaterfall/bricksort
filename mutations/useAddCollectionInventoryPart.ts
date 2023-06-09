import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAlerts } from '../components/AlertProvider';
import { CollectionInventory } from '../models/CollectionInventory';
import { CollectionInventoryPart } from '../models/CollectionInventoryPart';

async function addCollectionInventoryPart(collectionInventoryPartId: string, count: number) {
  const { origin } = window.location;
  const response = await axios.post<CollectionInventory>(`${origin}/api/collection/parts/${collectionInventoryPartId}/${count}`);

  const modifiedCollectionInventoryPart = response.data;
  return modifiedCollectionInventoryPart;
}

function useAddCollectionInventoryPart(collectionInventoryPart: CollectionInventoryPart) {
  const queryClient = useQueryClient();
  const { addAlert } = useAlerts();

  return useMutation((count: number) => addCollectionInventoryPart(collectionInventoryPart._id, count), {
    onSuccess: (newPart, count) => {
      queryClient.invalidateQueries(['collectionInventoryParts', collectionInventoryPart.collectionInventoryId]);

      if (count > 0) {
        addAlert(
          'Added parts to collection',
          `Added ${count} of ${collectionInventoryPart.inventoryPart.part.name} in ${collectionInventoryPart.inventoryPart.color.name}`,
          'success'
        );
      } else {
        addAlert(
          'Removed parts from collection',
          `Removed ${-count} of ${collectionInventoryPart.inventoryPart.part.name} in ${collectionInventoryPart.inventoryPart.color.name}`,
          'success'
        );
      }
    },
    onError: () => {
      addAlert('Failed to add parts to collection', 'Unknown error occurred, please try again later', 'error');
    },
  });
}

export default useAddCollectionInventoryPart;
