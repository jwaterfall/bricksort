import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import MainLayout from '@/components/layout/MainLayout';
import PartList from '@/components/layout/PartList';
import Toggle from '@/components/modules/Toggle';
import useSetParts from '@/hooks/queries/useSetParts';

const IndexPage: NextPage = () => {
  const [showAllParts, setShowAllParts] = useState(false);
  const setId = useRouter().query.setId as string;
  const { data: parts } = useSetParts(setId);

  const filteredParts = showAllParts ? parts : parts?.filter((part) => part.quantityFound < part.quantityTotal);

  return (
    <MainLayout>
      <Toggle toggled={showAllParts} setToggled={setShowAllParts} />
      {filteredParts && <PartList parts={filteredParts} />}
    </MainLayout>
  );
};

export default IndexPage;
