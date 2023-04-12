import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAlerts } from '../components/AlertProvider';
import { CollectionInventory } from '../models/CollectionInventory';
import { ExtendedCollectionInventoryPart } from '../models/CollectionInventoryPart';

async function addCollectionInventoryPart(collectionInventoryPartId: string, count: number) {
    const { origin } = window.location;
    const response = await axios.post<CollectionInventory>(`${origin}/api/collection/parts/${collectionInventoryPartId}/${count}`);

    const modifiedCollectionInventoryPart = response.data;
    return modifiedCollectionInventoryPart;
}

function useAddCollectionInventoryPart(collectionInventoryPart: ExtendedCollectionInventoryPart) {
    const queryClient = useQueryClient();
    const { addAlert } = useAlerts();

    return useMutation((count: number) => addCollectionInventoryPart(collectionInventoryPart._id, count), {
        onSuccess: (newPart, count) => {
            queryClient.invalidateQueries(['collectionInventoryParts', collectionInventoryPart.collectionInventory._id]);

            if (count > 0) {
                addAlert('Added parts to collection', 'success');
            } else {
                addAlert('Removed parts from collection', 'success');
            }
        },
        onError: () => {
            addAlert('Failed to add parts to collection', 'error');
        },
    });
}

export default useAddCollectionInventoryPart;
