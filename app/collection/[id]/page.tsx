'use client';

import { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useInView } from 'react-intersection-observer';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useCollectionInventoryParts from '@/queries/useCollectionInventoryParts';
import { CollectionInventoryPartCard } from './CollectionInventoryPartCard';

interface CollectionInventoryPageProps {
  params: {
    id: string;
  };
}

const CollectionInventoryPage = ({
  params: { id },
}: CollectionInventoryPageProps) => {
  const [tab, setTab] = useState('missing');
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useCollectionInventoryParts(id, 24, tab === 'missing');

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading || !data) return null;

  return (
    <>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="missing" className="flex-1">
            Missing
          </TabsTrigger>
          <TabsTrigger value="found" className="flex-1">
            Found
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.pages
          .map((page) => page.items)
          .flat()
          .map((collectionInventoryPart) => (
            <CollectionInventoryPartCard
              key={collectionInventoryPart._id}
              collectionInventoryPart={collectionInventoryPart}
            />
          ))}
        <div ref={ref} />
      </div>
    </>
  );
};

export default withPageAuthRequired(CollectionInventoryPage);
