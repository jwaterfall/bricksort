import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface StatisticsResponse {
    setCount: number;
    totalPartQuantity: number;
    totalPartQuantityFound: number;
}

export const getStatistics = async () => {
    const response = await axios.get(`${window.location.origin}/api/collection/inventories/statistics`);

    return response.data;
};

const useStatistics = () => useQuery<StatisticsResponse>(['statistics'], () => getStatistics());

export default useStatistics;
