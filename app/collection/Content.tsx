'use client';

import { FC } from 'react';

import CollectionInventoryCard from '@/components/CollectionInventoryCard';
import Tabs, { TabButton, TabButtons } from '@/components/navigation/Tabs';
import { CollectionInventory } from '@/models/CollectionInventory';

interface ContentProps {
  collectionInventories: CollectionInventory[];
}

const Content: FC<ContentProps> = async ({ collectionInventories }) => (
  <>
    <Tabs defaultValue="incomplete-sets">
      <TabButtons>
        <TabButton value="incomplete-sets">Incomplete Sets</TabButton>
        <TabButton value="complete-sets">Complete Sets</TabButton>
        <TabButton value="empty-sets">Empty Sets</TabButton>
        <TabButton value="all-sets">All Sets</TabButton>
        <TabButton value="missing-parts">Missing Parts</TabButton>
      </TabButtons>
    </Tabs>
    <div className="flex flex-col items-stretch gap-4 p-4">
      {collectionInventories.map((collectionInventory) => (
        <CollectionInventoryCard key={collectionInventory.id} collectionInventory={collectionInventory} />
      ))}
    </div>
  </>
);

export default Content;
