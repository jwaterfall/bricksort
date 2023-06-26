import { SearchParams, parseArraySearchParam, parseIntSearchParam, parseStringSearchParam } from '@/utils/searchParams';
import { getSets } from '@/utils/data/sets';
import { SetList } from './SetList';

const BrowsePage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const options = {
        limit: parseIntSearchParam(searchParams.limit),
        minYear: parseIntSearchParam(searchParams.minYear),
        maxYear: parseIntSearchParam(searchParams.maxYear),
        search: parseStringSearchParam(searchParams.search),
        themes: parseArraySearchParam(searchParams.theme),
    };

    const initialData = await getSets(options);

    return <SetList initialData={initialData} options={options} />;
};

export const revalidate = 0;

export default BrowsePage;
