'use client';

import { useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useDebounce } from 'usehooks-ts';
import { useInView } from 'react-intersection-observer';

import useSets from '@/queries/useSets';
import { SetCard } from './SetCard';

const theme = undefined;
const search = undefined;
const minYear = undefined;
const maxYear = undefined;

const HomePage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useSets(
    24,
    theme ?? undefined,
    useDebounce(search ?? ''),
    minYear,
    maxYear
  );

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading || !data) return null;

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {data.pages.map((page) => page.items).flat().map((set) => (
        <SetCard key={set._id} set={set} />
      ))}
      <div ref={ref} />
    </div>
  );
};

export default withPageAuthRequired(HomePage);
