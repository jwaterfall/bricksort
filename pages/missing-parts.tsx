import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { FC, useState } from 'react';

import MainLayout from '@/components/layout/MainLayout';

import { PageButton, PageControlsContainer, PageNumber } from '../components/elements/PageControls';
import PartList from '../components/modules/PartList';
import useParts from '../hooks/queries/useParts';

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
    <PageControlsContainer>
      {page > 1 && <PageButton onClick={() => setPage(1)}>First</PageButton>}
      <PageButton onClick={handlePreviousPage} disabled={page <= 1}>
        {'<'}
      </PageButton>
      <PageNumber>Page {page}</PageNumber>
      <PageButton onClick={handleNextPage} disabled={data ? page >= data.totalPages : true}>
        {'>'}
      </PageButton>
      {data && page < data.totalPages && (
        <PageButton onClick={() => setPage(data.totalPages)}>Last</PageButton>
      )}
    </PageControlsContainer>
  );

  return (
    <MainLayout>
      <PageControls />
      {data && <PartList parts={data.parts} showSet={true} page={page} />}
    </MainLayout>
  );
};

export default withPageAuthRequired(PartsPage);
