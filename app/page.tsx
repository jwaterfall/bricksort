import { getSets } from '@/services/set';
import { getThemes } from '@/services/theme';
import { Input } from '@/components/ui/input';
import { SetCard } from '@/components/set-card';
import { Filters } from './filters';

export default async function HomePage({ searchParams: { theme } }: any) {
  const sets = await getSets({ theme });
  const themes = await getThemes();

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <Input placeholder="Search sets" />
        <Filters themes={themes} />
      </div>
      <div className="grid gap-2">
        {sets.map((set) => (
          <SetCard key={set.id} set={set} />
        ))}
      </div>
    </div>
  );
}
