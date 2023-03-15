import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { AlertType, useAlerts } from "../components/AlertProvider";
import { CollectionInventory } from "../models/CollectionInventory";

async function createCollectionInventory(setId: string) {
    const { origin } = window.location;
    const response = await axios.post<CollectionInventory>(`${origin}/api/collection/inventories/${setId}`);

    const createdSet = response.data;
    return createdSet;
}

function useCreateCollectionInventory() {
    const queryClient = useQueryClient();
    const { addAlert } = useAlerts();

    return useMutation((setId: string) => createCollectionInventory(setId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["collectionInventories"]);
            addAlert("Added set to collection", AlertType.Success);
        },
        onError: () => {
            addAlert("Failed to add set to collection", AlertType.Error);
        },
    });
}

export default useCreateCollectionInventory;
