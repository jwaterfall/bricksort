import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

const CollectionPage = async () => {
    return <>test</>;
};

export default withPageAuthRequired(CollectionPage);
