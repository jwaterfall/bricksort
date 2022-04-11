import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { Set } from '../../models/Set';

async function deleteSet(set: string) {
  const { origin } = window.location;
  const response = await axios.delete<Set>(`${origin}/api/sets/${set}`);

  const deletedSet = response.data;
  return deletedSet;
}

function useDeleteSet() {
  const queryClient = useQueryClient();

  return useMutation((set: string) => deleteSet(set), {
    onSuccess: () => queryClient.invalidateQueries(['sets']),
  });
}

export default useDeleteSet;
