import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ExtendedCollectionInventoryPart } from "../models/CollectionInventoryPart";

interface SetResponse {
    collectionInventoryParts: ExtendedCollectionInventoryPart[];
    pageCount: number;
}

const getCollectionInventoryParts = async (id: string, page?: number, limit?: number, isSpare?: boolean) => {
    const response = await axios.get(`${window.location.origin}/api/collection/inventories/${id}/parts`, {
        params: { page, limit, isSpare },
    });

    return response.data;
};

const useCollectionInventoryParts = (id: string, page?: number, limit?: number, isSpare?: boolean) =>
    useQuery<SetResponse>(["collectionInventoryParts", id, page, limit, isSpare], () => getCollectionInventoryParts(id, page, limit, isSpare), {
        keepPreviousData: true,
    });

export default useCollectionInventoryParts;
