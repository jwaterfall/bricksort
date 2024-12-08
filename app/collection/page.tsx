import { getPartLists } from '@/services/part-list';
import { PartListCard } from '@/components/part-list-card';

export default async function CollectionPage() {
  const partLists = await getPartLists();

  return (
    <div className="p-4 grid gap-4">
      {partLists.map((partList) => (
        <PartListCard key={partList.id} partList={partList} />
      ))}
    </div>
  );
}
