import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAlerts } from '../components/AlertProvider';
import { CollectionInventory } from '../models/CollectionInventory';

async function deleteCollectionInventory(id: string) {
    const { origin } = window.location;
    const response = await axios.delete<CollectionInventory>(`${origin}/api/collection/inventories/${id}`);

    const deletedSet = response.data;
    return deletedSet;
}

function useDeleteCollectionInventory() {
    const queryClient = useQueryClient();
    const { addAlert } = useAlerts();

    return useMutation((id: string) => deleteCollectionInventory(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['collectionInventories']);
            addAlert('Removed set from collection', 'success');
        },
        onError: () => {
            addAlert('Failed to remove set from collection', 'error');
        },
    });
}

export default useDeleteCollectionInventory;
