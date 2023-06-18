import getSets from '@/data/getSets';
import { SetCard } from './SetCard';

const BrowsePage = async () => {
  const sets = await getSets();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-4 pb-8">
      {sets.map((set) => (
        <SetCard key={set.id} set={set} />
      ))}
    </div>
  );
};

export default BrowsePage;
