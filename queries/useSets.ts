import { useInfiniteQuery } from '@tanstack/react-query';
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

const useSets = (limit?: number, themes?: string[], search?: string, minYear?: number, maxYear?: number) =>
  useInfiniteQuery<SetResponse>(
    ['sets', limit, themes, search, minYear, maxYear],
    ({ pageParam = 1 }) => getSets(pageParam, limit, themes, search, minYear, maxYear),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    }
  );

export default useSets;
