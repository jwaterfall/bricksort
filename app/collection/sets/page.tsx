import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { getCollectionInventories } from '@/utils/data/collectionInventories';
import { CollectionInventoryList } from './CollectionInventoryList';

const CollectionPage = async () => {
    const session = await getSession();
    if (!session) return <></>;

    const options = {
        user: session.user.sub,
    };

    const initialData = await getCollectionInventories(options);

    return <CollectionInventoryList initialData={initialData} options={options} />;
};

export const revalidate = 0;

export default withPageAuthRequired(CollectionPage);
