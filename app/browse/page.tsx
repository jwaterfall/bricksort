'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, parseAsInteger, parseAsString, parseAsArrayOf } from 'next-usequerystate';
import { useDebounce } from 'usehooks-ts';

import useSets from '../../queries/useSets';
import SetCard from '../../components/SetCard';
import CardDisplay from '../../components/CardDisplay';
import SetFilterDropdown from '../../components/SetFilterDropdown';
import { Button } from '@/components/ui/button';

const BrowsePage = () => {
  const [search, setSearch] = useQueryState('search', { ...parseAsString, defaultValue: '', history: 'push' });
  const [minYear, setMinYear] = useQueryState('minYear', { ...parseAsInteger, defaultValue: 1950, history: 'push' });
  const [maxYear, setMaxYear] = useQueryState('maxYear', { ...parseAsInteger, defaultValue: new Date().getFullYear(), history: 'push' });
  const [themeIds, setThemeIds] = useQueryState<string[]>('themes', { ...parseAsArrayOf(parseAsString), defaultValue: [], history: 'push' });
  const { data, isLoading: isSetsLoading, fetchNextPage } = useSets(24, themeIds, useDebounce(search ?? ''), minYear, maxYear);

  if (isSetsLoading || !data) return null;

  return (
    <>
      <SetFilterDropdown
      search={search}
      setSearch={setSearch}
      minYear={minYear}
      setMinYear={setMinYear}
      maxYear={maxYear}
      setMaxYear={setMaxYear}
      themeIds={themeIds}
      setThemeIds={setThemeIds}
    />
      <CardDisplay pageCount={1} emptyTitle="No sets found!" emptySubtitle="Try changing your filters">
        {data.pages.map((page) => page.sets.map((set) => <SetCard key={set.id} set={set} />))}
        <Button onClick={() => fetchNextPage()} className="col-span-full">
          Load more
        </Button>
      </CardDisplay>
    </>
  );
};

export default withPageAuthRequired(BrowsePage);
