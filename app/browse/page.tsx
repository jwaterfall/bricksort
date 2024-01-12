'use client';

import { useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, parseAsInteger, parseAsString } from 'next-usequerystate';
import { useDebounce } from 'usehooks-ts';
import { useInView } from 'react-intersection-observer';

import useSets from '@/queries/useSets';
import SetCard from '@/components/SetCard';
import CardDisplay from '@/components/CardDisplay';
import SetFilterDropdown from '@/components/SetFilterDropdown';

const BrowsePage = () => {
  const [search, setSearch] = useQueryState('search', { ...parseAsString, history: 'push' });
  const [minYear, setMinYear] = useQueryState('minYear', { ...parseAsInteger, defaultValue: 1950, history: 'push' });
  const [maxYear, setMaxYear] = useQueryState('maxYear', { ...parseAsInteger, defaultValue: new Date().getFullYear() + 1, history: 'push' });
  const [theme, setTheme] = useQueryState('theme', { ...parseAsString, history: 'push' });
  const { data, isLoading, fetchNextPage, hasNextPage } = useSets(24, theme ?? undefined, useDebounce(search ?? ''), minYear, maxYear);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading || !data) return null;

  return (
    <>
      <SetFilterDropdown
        search={search ?? undefined}
        setSearch={setSearch}
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        theme={theme ?? undefined}
        setTheme={setTheme}
      />
      <CardDisplay pageCount={1} emptyTitle="No sets found!" emptySubtitle="Try changing your filters">
        {data.pages.map((page) => page.sets.map((set) => <SetCard key={set.id} set={set} />))}
        <div ref={ref} />
      </CardDisplay>
    </>
  );
};

export default withPageAuthRequired(BrowsePage);
