import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CollectionStatisticsResponse {
  setCount: number;
  partQuantity: number;
  partQuantityFound: number;
  sparePartQuantity: number;
  sparePartQuantityFound: number;
}

export const getStatistics = async () => {
  const response = await axios.get(`${window.location.origin}/api/collection/statistics`);

  return response.data;
};

const useCollectionStatistics = () => useQuery<CollectionStatisticsResponse>(['statistics'], () => getStatistics());

export default useCollectionStatistics;
