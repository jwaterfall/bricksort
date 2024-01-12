'use client';

import { useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, parseAsInteger, parseAsString } from 'next-usequerystate';
import { useInView } from 'react-intersection-observer';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useCollectionInventoryParts from '@/queries/useCollectionInventoryParts';
import CollectionInventoryPartCard from '@/components/CollectionInventoryPartCard';
import CardDisplay from '@/components/CardDisplay';

interface CollectionPageProps {
  params: {
    id: string;
  };
}

const CollectionPage = ({ params: { id } }: CollectionPageProps) => {
  const [tab, setTab] = useQueryState('tab', { ...parseAsString, defaultValue: 'missing-parts', history: 'push' });
  const { data, isLoading, fetchNextPage, hasNextPage } = useCollectionInventoryParts(id, 24, tab === 'missing-parts');
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading || !data) return null;

  return (
    <div className="flex flex-col gap-4 min-h-full">
      <div className="flex-1">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="missing-parts">Missing Parts</TabsTrigger>
            <TabsTrigger value="found-parts">Found Parts</TabsTrigger>
          </TabsList>
          <CardDisplay
            pageCount={1}
            emptyTitle={tab === 'missing-parts' ? 'Set complete!' : 'No parts found!'}
            emptySubtitle={
              tab === 'missing-parts'
                ? "You've found all of the parts in this set"
                : 'Head over to the missing parts tab to add some parts to this set'
            }
          >
            {data.pages.map((page) =>
              page.collectionInventoryParts.map((collectionInventoryPart) => (
                <CollectionInventoryPartCard key={collectionInventoryPart._id} collectionInventoryPart={collectionInventoryPart} />
              ))
            )}
            <div ref={ref} />
          </CardDisplay>
        </Tabs>
      </div>
    </div>
  );
};

export default withPageAuthRequired(CollectionPage);
