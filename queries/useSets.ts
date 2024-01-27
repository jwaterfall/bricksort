import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Set } from '@/models/Set';

interface PaginationResponse {
  items: Set[];
  pageCount: number;
}

export const getSets = async (page?: number, limit?: number, theme?: string, search?: string, minYear?: number, maxYear?: number) => {
  const response = await axios.get(`${window.location.origin}/api/sets`, {
    params: { page, limit, theme, search, minYear, maxYear },
  });

  return response.data;
};

const useSets = (limit?: number, theme?: string, search?: string, minYear?: number, maxYear?: number) =>
  useInfiniteQuery<PaginationResponse>(
    ['sets', limit, theme, search, minYear, maxYear],
    ({ pageParam = 1 }) => getSets(pageParam, limit, theme, search, minYear, maxYear),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => lastPage.pageCount > allPages.length ? allPages.length + 1 : undefined,
    }
  );

export default useSets;
