import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import useAlerts, { AlertType } from '@/components/modules/AlertProvider';
import { Part } from '@/models/Part';

async function incrementPart(part: Part, quantity: number) {
  const { origin } = window.location;
  const response = await axios.patch<Part>(`${origin}/api/sets/${part.parent._id}/parts/${part._id}/${quantity}`);

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
  const { addAlert } = useAlerts();

  return useMutation((quantity: number) => incrementPart(part, quantity), {
    onSuccess: (newPart, quantity) => {
      updateSetPartsQueryCache(queryClient, newPart);

      addAlert(
        AlertType.Success,
        `${quantity > 0 ? 'Added' : 'Removed'}  ${Math.abs(quantity)} ${Math.abs(quantity) > 1 ? 'parts' : 'part'}`,
        `${newPart.name}`,
        5000,
      );

      queryClient.invalidateQueries(['sets']);

      if (!page) return;
      updatePartsQueryCache(queryClient, page);
    },
    onError: () => {
      addAlert(AlertType.Error, 'error', 'something went wrong');
    },
  });
}

export default useIncrementPart;
