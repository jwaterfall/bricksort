import axios from 'axios';
import { useQuery } from 'react-query';

import { Part } from '@/models/Part';

interface Data {
  parts: Part[];
  currentPage: number;
  totalPages: number;
}

async function getParts(limit: number, page: number) {
  const { origin } = window.location;
  const response = await axios.get(`${origin}/api/parts`, {
    params: { limit, page },
  });

  const parts = response.data;
  return parts;
}

function useParts(page: number = 1) {
  return useQuery<Data>(['parts', page], () => getParts(60, page), {
    refetchInterval: 15000,
    keepPreviousData: true,
  });
}

export default useParts;
