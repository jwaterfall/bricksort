import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { FC } from 'react';

import MainLayout from '@/components/MainLayout';

const IndexPage: FC = () => (
  <MainLayout>
    <Head>
      <title>Home | Bricksort</title>
    </Head>
  </MainLayout>
);

export default withPageAuthRequired(IndexPage);
