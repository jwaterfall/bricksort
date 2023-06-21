import { NextResponse } from 'next/server';

import { GetSetsOptions, getSets } from '@/utils/data/sets';

export const POST = async (req: Request) => {
    const options: GetSetsOptions = await req.json();

    const data = await getSets(options);

    return NextResponse.json(data);
};
