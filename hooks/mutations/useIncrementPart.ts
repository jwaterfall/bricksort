import axios from 'axios';
import { QueryClient, useMutation, useQueryClient } from 'react-query';

import { Part } from '@/models/Part';

async function incrementPart(setId: string, partId: string, quantity: number) {
  const { origin } = window.location;
  const response = await axios.patch<Part>(
    `${origin}/api/sets/${setId}/parts/${partId}/${quantity}`,
  );

  const newPart = response.data;
  return newPart;
}

function updateSetPartsQueryCache(queryClient: QueryClient, newPart: Part) {
  const parent = newPart.parent._id;
  const queryKey = ['parts', parent];

  const parts: Part[] | undefined = queryClient.getQueryData(queryKey);
  if (!parts) return;

  queryClient.setQueryData(
    queryKey,
    parts.map((part) => (part._id === newPart._id ? newPart : part)),
  );
}

function updatePartsQueryCache(queryClient: QueryClient, page: number) {
  const queryKey = ['parts', page];

  queryClient.invalidateQueries(queryKey);
}

function useIncrementPart(part: Part, page?: number) {
  const queryClient = useQueryClient();

  return useMutation(
    (quantity: number) => incrementPart(part.parent as unknown as string, part._id, quantity),
    {
      onSuccess: (newPart) => {
        updateSetPartsQueryCache(queryClient, newPart);

        if (!page) return;
        updatePartsQueryCache(queryClient, page);
      },
    },
  );
}

export default useIncrementPart;
