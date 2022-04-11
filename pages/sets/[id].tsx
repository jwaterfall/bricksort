import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import MainLayout from '@/components/layout/MainLayout';

import Toggle from '../../components/elements/Toggle';
import PartList from '../../components/modules/PartList';
import useSetParts from '../../hooks/queries/useSetParts';

const IndexPage: NextPage = () => {
  const [showAllParts, setShowAllParts] = useState(false);
  const { id } = useRouter().query;
  const { data: parts } = useSetParts(id as string);

  const filteredParts = showAllParts
    ? parts
    : parts?.filter((part) => part.quantityFound < part.quantityTotal);

  return (
    <MainLayout>
      <Toggle toggled={showAllParts} setToggled={setShowAllParts} />
      {filteredParts && <PartList parts={filteredParts} />}
    </MainLayout>
  );
};

export default IndexPage;
