import { SetCard } from '@/components/set-card';
import { getSets } from '@/services/set';

export default async function Home() {
  const sets = await getSets();

  return (
    <div className="p-4 grid gap-4">
      {sets.map((set) => (
        <SetCard key={set.id} set={set} />
      ))}
    </div>
  );
}
