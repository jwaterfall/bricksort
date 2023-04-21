import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, queryTypes } from 'next-usequerystate';
import { useDebounce } from 'usehooks-ts';

import useSets from '../queries/useSets';
import SetCard from '../components/SetCard';
import CardDisplay from '../components/CardDisplay';
import SetFilterDropdown from '../components/SetFilterDropdown';

const BrowsePage: NextPage = () => {
    const [search, setSearch] = useQueryState('search', { ...queryTypes.string, defaultValue: '', history: 'push' });
    const [minYear, setMinYear] = useQueryState('minYear', { ...queryTypes.integer, defaultValue: 1950, history: 'push' });
    const [maxYear, setMaxYear] = useQueryState('maxYear', { ...queryTypes.integer, defaultValue: new Date().getFullYear(), history: 'push' });
    const [themeIds, setThemeIds] = useQueryState<string[]>('themes', { ...queryTypes.array(queryTypes.string), defaultValue: [], history: 'push' });
    const [page, setPage] = useQueryState('page', { ...queryTypes.integer, defaultValue: 1, history: 'push' });
    const { data, isLoading: isSetsLoading } = useSets(page, 20, themeIds, useDebounce(search ?? ''), minYear, maxYear);

    if (isSetsLoading || !data) return null;

    const FilterDropdown = (
        <SetFilterDropdown
            search={search}
            setSearch={setSearch}
            minYear={minYear}
            setMinYear={setMinYear}
            maxYear={maxYear}
            setMaxYear={setMaxYear}
            themeIds={themeIds}
            setThemeIds={setThemeIds}
            setPage={setPage}
        />
    );

    return (
        <CardDisplay
            page={page}
            setPage={setPage}
            pageCount={data.pageCount}
            emptyTitle="No sets found!"
            emptySubtitle="Try changing your filters"
            FilterDropdown={FilterDropdown}
        >
            {data.sets.map((set) => (
                <SetCard key={set.id} set={set} />
            ))}
        </CardDisplay>
    );
};

export default withPageAuthRequired(BrowsePage);
