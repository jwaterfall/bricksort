'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, parseAsInteger, parseAsString } from 'next-usequerystate';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useCollectionInventoryParts from '@/queries/useCollectionInventoryParts';
import CollectionInventoryPartCard from '@/components/CollectionInventoryPartCard';
import CardDisplay from '@/components/CardDisplay';

interface CollectionPageProps {
  params: {
    id: string;
  };
}

const CollectionPage = ({ params: { id } }: CollectionPageProps) => {
  const [page, setPage] = useQueryState('page', { ...parseAsInteger, defaultValue: 1, history: 'push' });
  const [tab, setTab] = useQueryState('tab', { ...parseAsString, defaultValue: 'missing-parts', history: 'push' });
  const { data, isLoading } = useCollectionInventoryParts(id, page, 24, tab === 'missing-parts');

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
            pageCount={data.pageCount}
            emptyTitle={tab === 'missing-parts' ? 'Set complete!' : 'No parts found!'}
            emptySubtitle={
              tab === 'missing-parts'
                ? "You've found all of the parts in this set"
                : 'Head over to the missing parts tab to add some parts to this set'
            }
          >
            {data.collectionInventoryParts.map((collectionInventoryPart) => (
              <CollectionInventoryPartCard key={collectionInventoryPart._id} collectionInventoryPart={collectionInventoryPart} />
            ))}
          </CardDisplay>
        </Tabs>
      </div>
    </div>
  );
};

export default withPageAuthRequired(CollectionPage);
