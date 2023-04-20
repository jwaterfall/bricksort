import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Set } from '../models/Set';

interface SetResponse {
    sets: Set[];
    pageCount: number;
}

export const getSets = async (page?: number, limit?: number, themes: string[] = [], search?: string, minYear?: number, maxYear?: number) => {
    const response = await axios.get(`${window.location.origin}/api/sets`, {
        params: { page, limit, themes, search, minYear, maxYear },
    });

    return response.data;
};

const useSets = (page?: number, limit?: number, themes?: string[], search?: string, minYear?: number, maxYear?: number) =>
    useQuery<SetResponse>(['sets', page, limit, themes, search, minYear, maxYear], () => getSets(page, limit, themes, search, minYear, maxYear), {
        keepPreviousData: true,
    });

export default useSets;
