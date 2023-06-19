import { getSets, GetSetsOptions } from '@/utils/data/sets';
import { SetCard } from './SetCard';

const BrowsePage = async ({ searchParams }: { searchParams: GetSetsOptions }) => {
    const { items } = await getSets(searchParams);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-4 pb-8">
            {items.map((set) => (
                <SetCard key={set.id} set={set} />
            ))}
        </div>
    );
};

export default BrowsePage;
