import { getSets } from '@/utils/data/sets';
import { SearchParams, parseArraySearchParam, parseIntSearchParam, parseStringSearchParam } from '@/utils/searchParams';
import { SetsList } from './SetsList';

const BrowsePage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const options = {
        limit: parseIntSearchParam(searchParams.limit),
        minYear: parseIntSearchParam(searchParams.minYear),
        maxYear: parseIntSearchParam(searchParams.maxYear),
        search: parseStringSearchParam(searchParams.search),
        themes: parseArraySearchParam(searchParams.theme),
    };

    const initialData = await getSets(options);

    return <SetsList initialData={initialData} options={options} />;
};

export const revalidate = 0;

export default BrowsePage;
