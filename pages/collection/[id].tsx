import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, queryTypes } from 'next-usequerystate';

import useCollectionInventoryParts from '@/queries/useCollectionInventoryParts';
import CollectionInventoryPartCard from '@/components/CollectionInventoryPartCard';
import CardDisplay from '@/components/CardDisplay';
import Tabs, { TabButtons, TabButton } from '@/components/navigation/Tabs';

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [page, setPage] = useQueryState('page', { ...queryTypes.integer, defaultValue: 1, history: 'push' });
  const [tab, setTab] = useQueryState('tab', { ...queryTypes.string, defaultValue: 'missing-parts', history: 'push' });
  const { data, isLoading } = useCollectionInventoryParts(id, page, 28, tab === 'missing-parts');

  if (isLoading || !data) return null;

  return (
    <div className="flex flex-col gap-4 min-h-full">
      <div className="flex-1">
        <Tabs value={tab} onValueChange={setTab}>
          <TabButtons>
            <TabButton value="missing-parts">Missing Parts</TabButton>
            <TabButton value="found-parts">Found Parts</TabButton>
          </TabButtons>
          <CardDisplay
            page={page}
            setPage={setPage}
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
