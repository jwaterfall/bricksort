import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Set } from '@/models/Set';

async function createSet(setId: string) {
  const { origin } = window.location;
  const response = await axios.post<Set>(`${origin}/api/sets`, { setId });

  const createdSet = response.data;
  return createdSet;
}

function useCreateSet() {
  const queryClient = useQueryClient();

  return useMutation((setId: string) => createSet(setId), {
    onSuccess: () => queryClient.invalidateQueries(['sets']),
  });
}

export default useCreateSet;
