import { NextResponse } from 'next/server';

import { GetCollectionInventoriesOptions, getCollectionInventories } from '@/utils/data/collectionInventories';

export const POST = async (req: Request) => {
    const options: GetCollectionInventoriesOptions = await req.json();

    const data = await getCollectionInventories(options);

    return NextResponse.json(data);
};
