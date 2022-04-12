import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { FC, useState } from 'react';

import { Flexbox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import Typography from '@/components/elements/Typography';
import MainLayout from '@/components/layout/MainLayout';
import PartList from '@/components/layout/PartList';
import useParts from '@/hooks/queries/useParts';

const PartsPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useParts(page);

  const handlePreviousPage = () => {
    setPage((old) => old - 1);
  };

  const handleNextPage = () => {
    setPage((old) => old + 1);
  };

  const PageControls: FC = () => (
    <Flexbox padding="1rem" alignItems="center" gap="0.5rem">
      {page > 1 && (
        <Button size="sm" onClick={() => setPage(1)}>
          First
        </Button>
      )}
      <Button size="sm" onClick={handlePreviousPage} disabled={page <= 1}>
        {'<'}
      </Button>
      <Typography>Page {page}</Typography>
      <Button size="sm" onClick={handleNextPage} disabled={data ? page >= data.totalPages : true}>
        {'>'}
      </Button>
      {data && page < data.totalPages && (
        <Button size="sm" onClick={() => setPage(data.totalPages)}>
          Last
        </Button>
      )}
    </Flexbox>
  );

  return (
    <MainLayout>
      <PageControls />
      {data && <PartList parts={data.parts} showSet={true} page={page} />}
    </MainLayout>
  );
};

export default withPageAuthRequired(PartsPage);
