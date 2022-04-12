import axios from 'axios';
import { useQuery } from 'react-query';

import { Part } from '@/models/Part';

async function getParts(setId: string) {
  const { origin } = window.location;
  const response = await axios.get(`${origin}/api/sets/${setId}/parts`);

  const parts = response.data;
  return parts;
}

function useSetParts(setId: string) {
  return useQuery<Part[]>(['parts', setId], () => getParts(setId), {
    keepPreviousData: true,
  });
}

export default useSetParts;
