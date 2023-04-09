import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQueryState, queryTypes } from 'next-usequerystate';

import useCollectionInventoryParts from '../../../queries/useCollectionInventoryParts';
import CardDisplay from '../../../components/CardDisplay';
import CollectionInventoryPartCard from '../../../components/Card/CollectionInventoryPartCard';

const CollectionPage: NextPage = () => {
    const id = useRouter().query.id as string;
    const tab = useRouter().query.tab as string;

    const [page, setPage] = useQueryState('page', { ...queryTypes.integer, defaultValue: 1, history: 'push' });
    const { data: missingPartsData, isLoading: isMissingPartsLoading } = useCollectionInventoryParts(id, page, 20, true);
    const { data: allPartsData, isLoading: isAllPartsLoading } = useCollectionInventoryParts(id, page, 20);

    if (isAllPartsLoading || !allPartsData || isMissingPartsLoading || !missingPartsData) return null;

    return (
        <div className="flex flex-col gap-4 min-h-full">
            <div className="tabs tabs-boxed grid grid-cols-2 -m-4 mb-0">
                <Link className={`tab ${tab === 'missing-parts' ? 'tab-active' : ''}`} href={`/collection/${id}/missing-parts`}>
                    Missing Parts
                </Link>
                <Link className={`tab ${tab === 'all-parts' ? 'tab-active' : ''}`} href={`/collection/${id}/all-parts`}>
                    All Parts
                </Link>
            </div>
            <div className="flex-1">
                {tab === 'missing-parts' && (
                    <CardDisplay
                        page={page}
                        setPage={setPage}
                        pageCount={missingPartsData.pageCount}
                        emptyTitle="Congratulations!"
                        emptySubtitle="You've found all the minifig in this collection"
                    >
                        {missingPartsData.collectionInventoryParts.map((collectionInventoryPart) => (
                            <CollectionInventoryPartCard key={collectionInventoryPart.id} collectionInventoryPart={collectionInventoryPart} />
                        ))}
                    </CardDisplay>
                )}
                {tab === 'all-parts' && (
                    <CardDisplay
                        page={page}
                        setPage={setPage}
                        pageCount={allPartsData.pageCount}
                        emptyTitle="Congratulations!"
                        emptySubtitle="You've found all the parts in this collection"
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
