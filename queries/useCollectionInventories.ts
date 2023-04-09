import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ExtendedCollectionInventory } from "../models/CollectionInventory";

interface SetResponse {
    collectionInventories: ExtendedCollectionInventory[];
    pageCount: number;
}

export const getCollectionInventories = async (page?: number, limit?: number) => {
    const response = await axios.get(`${window.location.origin}/api/collection/inventories`, {
        params: { page, limit },
    });

    return response.data;
};

const useCollectionInventories = (page?: number, limit?: number) =>
    useQuery<SetResponse>(["collectionInventories", page, limit], () => getCollectionInventories(page, limit), {
        keepPreviousData: true,
    });

export default useCollectionInventories;
