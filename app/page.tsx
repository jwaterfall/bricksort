import { getSets } from '@/services/set';
import { connectToDatabase } from '@/lib/utils';
import { SetCard } from './set-card';

export default async function Home() {
  await connectToDatabase();
  const sets = await getSets();

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {sets.map((set) => (
        <SetCard key={set._id} set={set} />
      ))}
    </div>
  );
}
