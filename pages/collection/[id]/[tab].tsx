import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, queryTypes } from 'next-usequerystate';

import useCollectionInventoryParts from '@/queries/useCollectionInventoryParts';
import CollectionInventoryPartCard from '@/components/CollectionInventoryPartCard';
import CardDisplay from '@/components/CardDisplay';
import Tabs, { Tab } from '@/components/navigation/Tabs';



const CollectionPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const tab = router.query.tab as string;

  const [page, setPage] = useQueryState('page', { ...queryTypes.integer, defaultValue: 1, history: 'push' });
  const { data, isLoading } = useCollectionInventoryParts(id, page, 28, tab === 'missing-parts');

  if (isLoading || !data) return null;

  return (
    <div className="flex flex-col gap-4 min-h-full">
      <Tabs active={tab} onChange={(newTab) => router.push(`/collection/${id}/${newTab}`)}>
        <Tab id="missing-parts">Missing Parts</Tab>
        <Tab id="found-parts">Found Parts</Tab>
      </Tabs>
      <div className="flex-1">
        <CardDisplay
          page={page}
          setPage={setPage}
          pageCount={data.pageCount}
          emptyTitle={tab === 'missing-parts' ? 'Set complete!' : 'No parts found!'}
          emptySubtitle={
            tab === 'missing-parts' ? "You've found all of the parts in this set" : 'Head over to the missing parts tab to add some parts to this set'
          }
        >
          {data.collectionInventoryParts.map((collectionInventoryPart) => (
            <CollectionInventoryPartCard key={collectionInventoryPart._id} collectionInventoryPart={collectionInventoryPart} />
          ))}
        </CardDisplay>
      </div>
    </div>
  );
};

export default withPageAuthRequired(CollectionPage);
