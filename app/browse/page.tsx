import { getSets } from '@/utils/data/sets';
import { SearchParams, parseIntSearchParam } from '@/utils/searchParams';
import { CustomPagination } from './CustomPagination';
import { CustomSearch } from './CustomSearch';
import { SetCard } from './SetCard';

const BrowsePage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const page = parseIntSearchParam(searchParams.page);

    const { items, pageCount } = await getSets({
        page,
        limit: parseIntSearchParam(searchParams.limit),
        minYear: parseIntSearchParam(searchParams.minYear),
        maxYear: parseIntSearchParam(searchParams.maxYear),
        search: searchParams.search,
        // themesIds: searchParams.themesIds,
    });

    return (
        <>
            <div className="p-4 w-full flex justify-between items-center">
                <CustomSearch />
                <CustomPagination page={page ?? 1} pageCount={pageCount} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-4">
                {items.map((set) => (
                    <SetCard key={set.id} set={set} />
                ))}
            </div>
            <div className="p-4 w-full flex justify-end">
                <CustomPagination page={page ?? 1} pageCount={pageCount} />
            </div>
        </>
    );
};

export default BrowsePage;
