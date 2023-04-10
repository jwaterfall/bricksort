import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, queryTypes } from 'next-usequerystate';

import useCollectionInventoryParts from '../../../queries/useCollectionInventoryParts';
import CardDisplay from '../../../components/CardDisplay';
import CollectionInventoryPartCard from '../../../components/CollectionInventoryPartCard';

const CollectionPage: NextPage = () => {
    const id = useRouter().query.id as string;
    const tab = useRouter().query.tab as string;

    const [page, setPage] = useQueryState('page', { ...queryTypes.integer, defaultValue: 1, history: 'push' });
    const { data: missingPartsData, isLoading: isMissingPartsLoading } = useCollectionInventoryParts(id, page, 20, true);
    const { data: allPartsData, isLoading: isAllPartsLoading } = useCollectionInventoryParts(id, page, 20);

    if (isAllPartsLoading || !allPartsData || isMissingPartsLoading || !missingPartsData) return null;

    return (
        <div className="flex flex-col gap-4 min-h-full">
            <div className="grid grid-cols-2 bg-slate-50 rounded-md overflow-hidden border border-slate-300">
                <Link
                    className={`px-4 py-1 flex justify-center font-medium text-sm transition ${
                        tab === 'missing-parts' ? 'bg-red-500 text-slate-50' : ''
                    }`}
                    href={`/collection/${id}/missing-parts`}
                >
                    Missing Parts
                </Link>
                <Link
                    className={`px-4 py-1 flex justify-center font-medium text-sm transition ${
                        tab === 'found-parts' ? 'bg-red-500 text-slate-50' : ''
                    }`}
                    href={`/collection/${id}/found-parts`}
                >
                    Found Parts
                </Link>
            </div>
            <div className="flex-1">
                {tab === 'missing-parts' && (
                    <CardDisplay
                        page={page}
                        setPage={setPage}
                        pageCount={missingPartsData.pageCount}
                        emptyTitle="Congratulations!"
                        emptySubtitle="You've found all of the parts in this collection"
                    >
                        {missingPartsData.collectionInventoryParts.map((collectionInventoryPart) => (
                            <CollectionInventoryPartCard key={collectionInventoryPart.id} collectionInventoryPart={collectionInventoryPart} />
                        ))}
                    </CardDisplay>
                )}
                {tab === 'found-parts' && (
                    <CardDisplay
                        page={page}
                        setPage={setPage}
                        pageCount={allPartsData.pageCount}
                        emptyTitle="No parts found!"
                        emptySubtitle="Head over to the missing parts tab to add some parts to this collection"
                    >
                        {allPartsData.collectionInventoryParts.map((collectionInventoryPart) => (
                            <CollectionInventoryPartCard key={collectionInventoryPart.id} collectionInventoryPart={collectionInventoryPart} />
                        ))}
                    </CardDisplay>
                )}
            </div>
        </div>
    );
};

export default withPageAuthRequired(CollectionPage);
