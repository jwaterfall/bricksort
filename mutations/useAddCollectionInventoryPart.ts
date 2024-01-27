import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { CollectionInventory } from '../models/CollectionInventory';
import { CollectionInventoryPart } from '../models/CollectionInventoryPart';

async function addCollectionInventoryPart(
  collectionInventoryPartId: string,
  count: number
) {
  const { origin } = window.location;
  const response = await axios.post<CollectionInventory>(
    `${origin}/api/collection/parts/${collectionInventoryPartId}/${count}`
  );

  const modifiedCollectionInventoryPart = response.data;
  return modifiedCollectionInventoryPart;
}

function useAddCollectionInventoryPart(
  collectionInventoryPart: CollectionInventoryPart
) {
  const queryClient = useQueryClient();

  return useMutation(
    (count: number) =>
      addCollectionInventoryPart(collectionInventoryPart._id, count),
    {
      onSuccess: (newPart, count) => {
        queryClient.invalidateQueries([
          'collectionInventoryParts',
          collectionInventoryPart.collectionInventoryId,
        ]);

        if (count > 0) {
          toast('Added parts to collection', {
            description: `Added ${count} of ${collectionInventoryPart.inventoryPart.part.name} in ${collectionInventoryPart.inventoryPart.color.name}`,
          });
        } else {
          toast('Removed parts from collection', {
            description: `Removed ${-count} of ${
              collectionInventoryPart.inventoryPart.part.name
            } in ${collectionInventoryPart.inventoryPart.color.name}`,
          });
        }
      },
      onError: () => {
        toast('Failed to add parts to collection', {
          description: 'Unknown error occurred, please try again later',
        });
      },
    }
  );
}

export default useAddCollectionInventoryPart;
