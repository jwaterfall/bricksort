import axios from 'axios';
import { useQuery } from 'react-query';

import { Set } from '@/models/Set';

async function getSets() {
  const { origin } = window.location;
  const response = await axios.get(`${origin}/api/sets`);

  const sets = response.data;
  return sets;
}

function useSets() {
  return useQuery<Set[]>(['sets'], () => getSets());
}

export default useSets;
