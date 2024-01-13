import Image from 'next/image';
import Link from 'next/link';
import { Blocks, BookmarkPlus, ToyBrick } from 'lucide-react';

import { connectToDatabase } from '@/lib/utils';
import SetModel from '@/models/Set';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

async function getSets() {
  await connectToDatabase();
  const excludedThemes = ['501', '739', '736', '408', '497', '688', '737', '503', '740', '733', '741', '398', '598', '746'];

  const sets = await SetModel.find({ themeId: { $nin: excludedThemes } })
    .sort({ year: -1, themeId: 1, name: 1 })
    .limit(20);
  return sets;
}

export default async function Home() {
  const sets = await getSets();

  return (
    <div className="grid grid-cols-5 gap-4">
      {sets.map((set) => (
        <Card key={set._id}>
          <Image src={set.imageUrl} alt={set.name} width={320} height={180} className="aspect-video object-contain p-4 w-full" />
          <hr className="mx-4" />
          <CardHeader>
            <CardTitle className="truncate">{set.name}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              #{set._id} • {set.year}
              <Badge variant="secondary">
                <ToyBrick size={14} strokeWidth={2} className="mr-0.5" />
                {set.partCount}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Link href={`/sets/${set._id}`} className="mr-auto">
              <Button variant="link" size="text">
                View set
              </Button>
            </Link>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon">
                  <Blocks size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to collection</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon">
                  <BookmarkPlus size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to wishlist</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
