'use client';

import { useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useInView } from 'react-intersection-observer';

import useCollectionInventories from '@/queries/useCollectionInventories';
import { CollectionInventoryCard } from './CollectionInventoryCard';

const CollectionPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useCollectionInventories(24);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading || !data) return null;

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {data.pages
        .map((page) => page.items)
        .flat()
        .map((collectionInventory) => (
          <CollectionInventoryCard key={collectionInventory._id} collectionInventory={collectionInventory} />
        ))}
      <div ref={ref} />
    </div>
  );
};

export default withPageAuthRequired(CollectionPage);
