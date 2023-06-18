import Image from 'next/image';
import { MdHandyman } from 'react-icons/md';

import { Card, CardBody, CardFooter, CardTitle } from '@/components/display/Card';
import { IconButton } from '@/components/actions/IconButton';
import getSets from '@/data/getSets';

const BrowsePage = async () => {
  const sets = await getSets();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-4 pb-8">
      {sets.map((set) => (
        <Card key={set._id} width="w-full">
          <figure className="w-full aspect-video bg-zinc-50 overflow-hidden p-4">
            <Image src={set.imageUrl} alt={set.name} width={400} height={400} className="h-full w-full object-contain mix-blend-multiply" />
          </figure>
          <CardBody>
            <CardTitle truncate>{set.name}</CardTitle>
            {set.theme.name}
          </CardBody>
          <CardFooter>
            <IconButton variant="tonal" icon={MdHandyman} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BrowsePage;
