import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { useState } from 'react';

import { Flexbox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import MainLayout from '@/components/layout/MainLayout';
import SetCard from '@/components/modules/SetCard';
import useCreateSet from '@/hooks/mutations/useCreateSet';
import useSets from '@/hooks/queries/useSets';

const SetPage: NextPage = () => {
  const [set, setSet] = useState('');
  const { data: sets } = useSets();
  const { mutate: addSet } = useCreateSet();
  return (
    <MainLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSet(set.includes('-') ? set : set + '-1');
          setSet('');
        }}
      >
        <Flexbox gap="0.5rem" alignItems="center" padding="1rem">
          <Input variant="primary" value={set} onChange={(e) => setSet(e.target.value)} required />
          <Button>Add Set</Button>
        </Flexbox>
      </form>
      {sets?.map((set) => (
        <SetCard key={set._id} set={set} />
      ))}
    </MainLayout>
  );
};

export default withPageAuthRequired(SetPage);
