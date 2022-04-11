import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { useState } from 'react';

import MainLayout from '@/components/layout/MainLayout';

import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import Set from '../components/modules/Set';
import useCreateSet from '../hooks/mutations/useCreateSet';
import useSets from '../hooks/queries/useSets';

const SetPage: NextPage = () => {
  const [set, setSet] = useState('');
  const { data: sets } = useSets();
  const { mutate: addSet } = useCreateSet();
  return (
    <MainLayout>
      <form
        style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}
        onSubmit={(e) => {
          e.preventDefault();
          addSet(set.includes('-') ? set : set + '-1');
          setSet('');
        }}
      >
        <Input
          variant="primary"
          style={{ padding: '1rem' }}
          value={set}
          onChange={(e) => setSet(e.target.value)}
          required
        />
        <Button style={{ padding: '1rem' }}>Add</Button>
      </form>
      {sets?.map((set) => (
        <Set key={set._id} set={set} />
      ))}
    </MainLayout>
  );
};

export default withPageAuthRequired(SetPage);
